export interface EmailProvider {
    name: string;
    send(to: string, subject: string, body: string): Promise<void>;
}
