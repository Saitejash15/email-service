import axios, { AxiosError } from 'axios';

interface Email {
  to: string;
  subject: string;
  body: string;
}

interface EmailProvider {
  sendEmail: (email: Email) => Promise<boolean>;
}

class EmailService {
  private providerA: EmailProvider;
  private providerB: EmailProvider;
  private retries: number = 3;
  private backoffTime: number = 1000; // Initial backoff time in ms
  private emailQueue: Email[] = [];
  private sentEmails: Set<string> = new Set();
  private isRateLimited: boolean = false;
  private rateLimitResetTime: number = 0;

  constructor(providerA: EmailProvider, providerB: EmailProvider) {
    this.providerA = providerA;
    this.providerB = providerB;
  }

  private async sendWithRetry(email: Email, provider: EmailProvider, retries: number): Promise<boolean> {
    let attempt = 0;
    while (attempt < retries) {
      try {
        const result = await provider.sendEmail(email);
        if (result) {
          console.log(`Email sent successfully to ${email.to}`);
          return true;
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Error sending email: ${error.message}`);
        } else {
          console.error('An unknown error occurred.');
        }
      }
      attempt++;
      await this.delay(this.backoffTime * Math.pow(2, attempt)); // Exponential backoff
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async sendEmail(email: Email): Promise<boolean> {
    if (this.isRateLimited) {
      console.log('Rate limit exceeded. Please try again later.');
      return false;
    }

    const emailId = this.generateEmailId(email);
    if (this.sentEmails.has(emailId)) {
      console.log('Duplicate email detected. Skipping.');
      return true;
    }
    this.sentEmails.add(emailId);

    let success = await this.sendWithRetry(email, this.providerA, this.retries);
    if (!success) {
      console.log('Switching to provider B.');
      success = await this.sendWithRetry(email, this.providerB, this.retries);
    }
    return success;
  }

  public enqueueEmail(email: Email): void {
    this.emailQueue.push(email);
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.emailQueue.length > 0) {
      const email = this.emailQueue.shift()!;
      const success = await this.sendEmail(email);
      if (!success) {
        console.log('Failed to send email after retries');
      }
    }
  }

  private generateEmailId(email: Email): string {
    return `${email.to}-${email.subject}-${email.body}`;
  }
}

export { EmailService, Email };
