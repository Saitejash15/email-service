import { MockEmailProvider2 } from '../../src/providers/MockEmailProvider2';

describe('MockEmailProvider2', () => {
    it('should send an email successfully', async () => {
        const provider = new MockEmailProvider2();
        await provider.send('example@example.com', 'Test Subject', 'Test Body');
    });

    it('should fail randomly', async () => {
        const provider = new MockEmailProvider2();
        try {
            await provider.send('example@example.com', 'Test Subject', 'Test Body');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});
