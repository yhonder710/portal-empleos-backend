export interface OtpService {
  generateAndSaveCode(email: string): Promise<string>;

  verifyCode(email: string, userCode: string): Promise<boolean>;
}
