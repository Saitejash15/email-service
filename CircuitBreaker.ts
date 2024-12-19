export class CircuitBreaker {
    private failureCount: number;
    private failureThreshold: number;

    constructor() {
        this.failureCount = 0;
        this.failureThreshold = 3; // Example threshold
    }

    isOpen(): boolean {
        return this.failureCount >= this.failureThreshold;
    }

    recordFailure(): void {
        this.failureCount++;
    }

    reset(): void {
        this.failureCount = 0;
    }
}
