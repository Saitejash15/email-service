import { EmailService } from '../src/EmailService';
import { MockEmailProvider1 } from '../src/providers/MockEmailProvider1';
import { MockEmailProvider2 } from '../src/providers/MockEmailProvider2';

describe('EmailService', () => {
    it('should send email using the first provider', async () => {
        const provider1 = new MockEmailProvider1();
        const provider2 = new MockEmailProvider2();
        const service = new EmailService([provider1, provider2]);

        await service.sendEmail('test-id', 'example@example.com', 'Test Subject', 'Test Body');
    });

    it('should retry with another provider on failure', async () => {
        const provider1 = new MockEmailProvider1();
        const provider2 = new MockEmailProvider2();
        const service = new EmailService([provider1, provider2]);

        jest.spyOn(provider1, 'send').mockImplementationOnce(() => {
            throw new Error('Failed');
        });

        await service.sendEmail('test-id-2', 'example2@example.com', 'Test Subject 2', 'Test Body 2');
    });
});
