import { Email } from './emailService';

class MockProviderA {
  public async sendEmail(email: Email): Promise<boolean> {
    console.log(`MockProviderA sending email to ${email.to}`);
    // Simulate a random failure
    if (Math.random() < 0.5) {
      throw new Error('MockProviderA failed');
    }
    return true;
  }
}

class MockProviderB {
  public async sendEmail(email: Email): Promise<boolean> {
    console.log(`MockProviderB sending email to ${email.to}`);
    // Simulate a random failure
    if (Math.random() < 0.5) {
      throw new Error('MockProviderB failed');
    }
    return true;
  }
}

export { MockProviderA, MockProviderB };
