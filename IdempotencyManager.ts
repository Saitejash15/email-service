export class IdempotencyManager {
    private sentEmails: Set<string>;

    constructor() {
        this.sentEmails = new Set<string>();
    }

    isDuplicate(id: string): boolean {
        return this.sentEmails.has(id);
    }

    markAsSent(id: string): void {
        this.sentEmails.add(id);
    }
}
