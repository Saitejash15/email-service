import { MockEmailProvider1 } from '../../src/providers/MockEmailProvider1';

describe('MockEmailProvider1', () => {
    it('should send an email successfully', async () => {
        const provider = new MockEmailProvider1();
        await provider.send('example@example.com', 'Test Subject', 'Test Body');
    });

    it('should fail randomly', async () => {
        const provider = new MockEmailProvider1();
        try {
            await provider.send('example@example.com', 'Test Subject', 'Test Body');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});
