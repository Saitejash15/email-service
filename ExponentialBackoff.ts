export class ExponentialBackoff {
    static async delay(attempt: number): Promise<void> {
        const delay = Math.pow(2, attempt) * 100; // Exponential backoff
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}
