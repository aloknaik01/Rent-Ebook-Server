import nodemailer from 'nodemailer';
import { config } from '../config/config.js';
export async function snedEmail({ email, subject, message }) {
  const transpoter = nodemailer.createTransport({
    host: config.smtp_host,
    service: config.smtp_service,
    port: config.sptp_port,
    auth: {
      user: config.smtp_user,
      pass: config.smtp_password,
    },
  });

  const mailOption = {
    from: config.smtp_email,
    to: email,
    subject,
    html: message,
  };

  await transpoter.sendMail(mailOption);
}
