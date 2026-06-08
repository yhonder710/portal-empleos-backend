// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationCode(to: string, code: string) {
    try {
      await this.mailerService.sendMail({
        from: '"Portal Empleos" <no-reply@portalempleos.com>',
        to: to,
        subject: '🔐 Código de Verificación - Portal Empleos',
        html: this.generateVerificationEmail(code, to),
      });
      return { success: true, message: 'Código de verificación enviado' };
    } catch (error) {
      throw new Error(`No se pudo enviar el código: ${error}`);
    }
  }

  private generateVerificationEmail(code: string, email: string): string {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Código de Verificación - Portal Empleos</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            background-color: #f4f7fb;
            font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            padding: 20px 0;
          }
          .email-container {
            max-width: 550px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          }
          .header {
            background: linear-gradient(135deg, #1e3a5f 0%, #2c5a8c 100%);
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            font-size: 28px;
            margin-bottom: 10px;
          }
          .header p {
            color: #cbd5e1;
            font-size: 16px;
          }
          .content {
            padding: 40px 30px;
          }
          .code-container {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 16px;
            padding: 30px;
            text-align: center;
            margin: 25px 0;
            border: 2px dashed #2c7da0;
          }
          .verification-code {
            font-size: 48px;
            font-weight: 800;
            letter-spacing: 8px;
            color: #1e3a5f;
            font-family: 'Courier New', monospace;
            background: white;
            display: inline-block;
            padding: 15px 30px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .expiry-text {
            color: #64748b;
            font-size: 14px;
            margin-top: 15px;
          }
          .btn-primary {
            display: inline-block;
            background-color: #2c7da0;
            color: #ffffff;
            font-weight: 600;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 40px;
            font-size: 16px;
            margin: 20px 0;
            transition: background 0.2s;
          }
          .btn-primary:hover {
            background-color: #1f5e7a;
          }
          .divider {
            height: 1px;
            background-color: #e2e8f0;
            margin: 25px 0;
          }
          .footer {
            background-color: #f8fafc;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          .footer p {
            color: #64748b;
            font-size: 12px;
            margin-bottom: 10px;
          }
          @media only screen and (max-width: 600px) {
            .email-container {
              width: 100% !important;
              border-radius: 0 !important;
            }
            .content {
              padding: 25px 20px !important;
            }
            .verification-code {
              font-size: 32px !important;
              letter-spacing: 4px !important;
              padding: 10px 20px !important;
            }
          }
        </style>
      </head>
      <body>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
          <tr>
            <td align="center">
              <div class="email-container">
                <!-- Header -->
                <div class="header">
                  <h1>🔐 Verifica tu cuenta</h1>
                  <p>Portal de Empleos</p>
                </div>

                <!-- Content -->
                <div class="content">
                  <h2 style="color: #0f172a; font-size: 22px; margin-bottom: 16px;">
                    ¡Hola!
                  </h2>

                  <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                    Has solicitado verificar tu cuenta en <strong>Portal de Empleos</strong>.
                    Para completar el proceso, utiliza el siguiente código de verificación:
                  </p>

                  <!-- Código de verificación -->
                  <div class="code-container">
                    <div class="verification-code">
                      ${code}
                    </div>
                    <p class="expiry-text">
                      ⏰ Este código expirará en <strong>5 minutos</strong>
                    </p>
                  </div>

                  <p style="color: #334155; font-size: 15px; line-height: 1.6; text-align: center;">
                    O haz clic en el botón para verificar automáticamente:
                  </p>

                  <div style="text-align: center;">
                    <a href="https://tuapp.com/verify?code=${code}&email=${encodeURIComponent(email)}"
                       class="btn-primary">
                      ✅ Verificar mi cuenta
                    </a>
                  </div>

                  <div class="divider"></div>

                  <div style="background-color: #fef3c7; padding: 15px; border-radius: 12px; margin-top: 20px;">
                    <p style="color: #92400e; font-size: 14px; margin: 0;">
                      ⚠️ <strong>Importante:</strong> Si no solicitaste este código, ignora este mensaje.
                      No compartas este código con nadie.
                    </p>
                  </div>

                  <p style="color: #64748b; font-size: 13px; margin-top: 25px; text-align: center;">
                    ¿Tienes problemas? Copia este código manualmente: <strong>${code}</strong>
                  </p>
                </div>

                <!-- Footer -->
                <div class="footer">
                  <p>© 2026 Portal de Empleos – Conectando talento con oportunidad</p>
                  <p>
                    <a href="https://tuapp.com/ayuda" style="color: #2c7da0;">Centro de ayuda</a> |
                    <a href="https://tuapp.com/privacidad" style="color: #2c7da0;">Política de privacidad</a>
                  </p>
                  <p style="font-size: 11px; margin-top: 10px;">
                    Este mensaje fue enviado a <strong>${email}</strong>
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  async sendCustomEmail(to: string, subject: string, content: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      text: content,
    });
  }
}
