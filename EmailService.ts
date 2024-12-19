import { EmailProvider } from './types';
import { ExponentialBackoff } from './utils/ExponentialBackoff';
import { RateLimiter } from './utils/RateLimiter';
import { IdempotencyManager } from './utils/IdempotencyManager';
import { CircuitBreaker } from './utils/CircuitBreaker';

export class EmailService {
    private providers: EmailProvider[];
    private currentProviderIndex: number = 0;
    private rateLimiter: RateLimiter;
    private idempotencyManager: IdempotencyManager;
    private circuitBreaker: CircuitBreaker;

    constructor(providers: EmailProvider[]) {
        this.providers = providers;
        this.rateLimiter = new RateLimiter(5); // 5 requests per minute as an example
        this.idempotencyManager = new IdempotencyManager();
        this.circuitBreaker = new CircuitBreaker();
    }

    private getNextProvider(): EmailProvider {
        this.currentProviderIndex = (this.currentProviderIndex + 1) % this.providers.length;
        return this.providers[this.currentProviderIndex];
    }

    async sendEmail(id: string, to: string, subject: string, body: string): Promise<void> {
        if (this.idempotencyManager.isDuplicate(id)) {
            console.log('Duplicate email detected. Skipping send.');
            return;
        }

        this.idempotencyManager.markAsSent(id);
        
        let provider = this.providers[this.currentProviderIndex];
        let attempt = 0;

        while (attempt < 3) {
            try {
                await this.rateLimiter.limit();
                if (this.circuitBreaker.isOpen()) {
                    provider = this.getNextProvider();
                }

                await provider.send(to, subject, body);
                console.log(`Email sent successfully using ${provider.name}`);
                return;
            } catch (error) {
                console.error(`Failed to send email with ${provider.name}, attempt ${attempt + 1}`);
                attempt++;
                await ExponentialBackoff.delay(attempt);
                this.circuitBreaker.recordFailure();
                provider = this.getNextProvider();
            }
        }

        console.error('All providers failed. Email not sent.');
    }
}
