import { EmailProvider } from '../types';

export class MockEmailProvider2 implements EmailProvider {
    name = 'MockEmailProvider2';

    async send(to: string, subject: string, body: string): Promise<void> {
        // Mock sending logic, randomly throw errors
        if (Math.random() < 0.5) {
            throw new Error('Mock failure');
        }
        console.log(`Email sent by ${this.name} to ${to}`);
    }
}
