# email-service
Implement a resilient email sending service in TypeScript/JavaScript.
# Email Sending Service

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install

2. Run tests:
   ```bash
   npm test

3. Usage:
   ```bash
   import { EmailService } from './src/EmailService';
   import { MockEmailProvider1, MockEmailProvider2 } from './src/providers';

   const service = new EmailService([new MockEmailProvider1(), new MockEmailProvider2()]);
   service.sendEmail('unique-id', 'example@example.com', 'Subject', 'Email body');

4. Assumptions:
* Mock providers are used for email sending.
* Exponential backoff is implemented with retries capped at 3 attempts.
* Circuit breaker pattern is basic with a fixed threshold.

5. Features:
* Retry mechanism with exponential backoff
* Fallback between providers
* Idempotency check
* Rate limiting
* Circuit breaker
