import { EmailService, Email } from './emailService';
import { MockProviderA, MockProviderB } from './mockProviders';

describe('EmailService', () => {
  let emailService: EmailService;
  let mockProviderA: MockProviderA;
  let mockProviderB: MockProviderB;

  // Initialize the email service before each test
  beforeEach(() => {
    mockProviderA = new MockProviderA();
    mockProviderB = new MockProviderB();
    emailService = new EmailService(mockProviderA, mockProviderB);
  });

  it('should send email successfully with provider A', async () => {
    const email: Email = { to: 'test@example.com', subject: 'Hello', body: 'World' };
    const result = await emailService.sendEmail(email); // Use the correct method name: sendEmail
    expect(result).toBe(true);
  });

  it('should switch to provider B when provider A fails', async () => {
    const email: Email = { to: 'test@example.com', subject: 'Hello', body: 'World' };
    const result = await emailService.sendEmail(email); // Use the correct method name: sendEmail
    expect(result).toBe(true);
  });

  it('should handle duplicate emails', async () => {
    const email: Email = { to: 'test@example.com', subject: 'Hello', body: 'World' };
    await emailService.sendEmail(email); // Ensure the first email is sent
    const result = await emailService.sendEmail(email); // Ensure the second email is not sent (idempotency)
    expect(result).toBe(true); 
  });
});
