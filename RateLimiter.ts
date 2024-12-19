export class RateLimiter {
    private tokens: number;
    private lastRefill: number;
    private refillRate: number;

    constructor(refillRate: number) {
        this.tokens = refillRate;
        this.lastRefill = Date.now();
        this.refillRate = refillRate;
    }

    async limit(): Promise<void> {
        const now = Date.now();
        const timePassed = now - this.lastRefill;

        this.tokens += (timePassed / 60000) * this.refillRate;
        if (this.tokens > this.refillRate) {
            this.tokens = this.refillRate;
        }

        this.lastRefill = now;

        if (this.tokens <= 0) {
            console.log('Rate limit exceeded. Waiting...');
            await new Promise(resolve => setTimeout(resolve, 60000));
            this.tokens = this.refillRate;
        }

        this.tokens--;
    }
}
