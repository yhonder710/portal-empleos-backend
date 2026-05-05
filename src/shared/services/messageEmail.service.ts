// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, name?: string) {
    await this.mailerService.sendMail({
      from: '<no-reply@puntonjson.com',
      to: to,
      subject: 'Bienvenido',
      html: `
      <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Bienvenido a [Portal de Empleos]</title>
    <style>
      /* Reseteo básico para clientes de correo */
      body, table, td, p, a {
        margin: 0;
        padding: 0;
      }
      body {
        background-color: #f4f7fb;
        font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
      /* Contenedor principal */
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
      }
      /* Botón principal */
      .btn-primary {
        display: inline-block;
        background-color: #2c7da0;
        color: #ffffff;
        font-weight: 600;
        text-decoration: none;
        padding: 12px 28px;
        border-radius: 40px;
        font-size: 16px;
        transition: background 0.2s;
      }
      .btn-primary:hover {
        background-color: #1f5e7a;
      }
      /* Separador */
      .divider {
        height: 1px;
        background-color: #e2e8f0;
        margin: 24px 0;
      }
      /* Responsive para móviles */
      @media only screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
          border-radius: 0 !important;
        }
        .content-padding {
          padding: 20px !important;
        }
        .btn-primary {
          display: block !important;
          text-align: center !important;
        }
      }
    </style>
  </head>
  <body style="background-color: #f4f7fb; padding: 20px 0;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#f4f7fb">
      <tr>
        <td align="center" style="padding: 20px 15px;">
          <!-- CONTENEDOR PRINCIPAL -->
          <table class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#ffffff" style="max-width:600px; width:100%; border-radius:16px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.05);">

            <!-- HEADER con imagen o logo -->
            <tr>
              <td bgcolor="#1e3a5f" align="center" style="padding: 30px 20px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">👋 ¡Bienvenido a <span style="color: #ffc857;">EmpleosYa</span>!</h1>
                <p style="color: #cbd5e1; margin-top: 10px; font-size: 16px;">Tu camino hacia el trabajo ideal comienza aquí</p>
              </td>
            </tr>

            <!-- CUERPO PRINCIPAL -->
            <tr>
              <td class="content-padding" style="padding: 32px 30px;">
                <h2 style="color: #0f172a; font-size: 22px; margin-top: 0; margin-bottom: 16px;">Hola [Nombre del usuario],</h2>
                <p style="color: #334155; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                  Nos alegra muchísimo que te unas a nuestra comunidad de talento. En <strong>EmpleosYa</strong> conectamos a profesionales como tú con las mejores oportunidades laborales.
                </p>
                <p style="color: #334155; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
                  Para que empieces con el pie derecho, te recomendamos completar tu perfil al 100%: añade tu experiencia, habilidades y currículum. Así los reclutadores podrán encontrarte fácilmente.
                </p>

                <!-- Botón de acción -->
                <div align="center" style="margin: 28px 0 20px;">
                  <a href="https://tusitio.com/completar-perfil" class="btn-primary" style="display: inline-block; background-color: #2c7da0; color: #ffffff; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 40px; font-size: 16px;">📝 Completar mi perfil</a>
                </div>

                <div class="divider" style="height:1px; background-color:#e2e8f0; margin:24px 0;"></div>

                <!-- Sección de consejos rápidos -->
                <h3 style="color: #0f172a; font-size: 18px; margin-bottom: 12px;">✨ Consejos para destacar</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                  <tr>
                    <td valign="top" width="30" style="padding-right: 12px;">🎯</td>
                    <td style="color: #334155; font-size: 15px; padding-bottom: 8px;">Activa las alertas de empleo según tus intereses.</td>
                  </tr>
                  <tr>
                    <td valign="top" width="30" style="padding-right: 12px;">📄</td>
                    <td style="color: #334155; font-size: 15px; padding-bottom: 8px;">Sube tu CV en PDF o Word (máx 5MB).</td>
                  </tr>
                  <tr>
                    <td valign="top" width="30" style="padding-right: 12px;">🔔</td>
                    <td style="color: #334155; font-size: 15px;">Sigue a las empresas que te interesan.</td>
                  </tr>
                </table>

                <p style="color: #334155; font-size: 15px; line-height: 1.5; margin-top: 20px;">
                  Si necesitas ayuda o tienes dudas, responde a este correo o visita nuestro <a href="https://tusitio.com/ayuda" style="color: #2c7da0; text-decoration: underline;">centro de ayuda</a>.
                </p>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td bgcolor="#f8fafc" style="padding: 24px 30px; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; font-size: 13px; line-height: 1.4; margin-bottom: 12px;">
                  © 2026 EmpleosYa – Conectando talento con oportunidad.<br>
                  Av. Principal #123, Ciudad, País.
                </p>
                <p style="color: #64748b; font-size: 12px;">
                  ¿No deseas recibir estos correos? <a href="https://tusitio.com/unsubscribe" style="color: #2c7da0; text-decoration: underline;">Cancela la suscripción aquí</a>.
                </p>
                <p style="color: #94a3b8; font-size: 11px; margin-top: 16px;">
                  Este mensaje se envió a <strong>[Email del usuario]</strong> porque te registraste en EmpleosYa.
                </p>
              </td>
            </tr>
          </table>
        </td>
      <table>
    </table>
  </body>
  </html>
      `,
    });
    return { message: 'Correo enviado' };
  }

  async sendCustomEmail(to: string, subject: string, content: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      text: content,
    });
  }
}
