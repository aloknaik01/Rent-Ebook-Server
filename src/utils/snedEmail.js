import nodemailer from 'nodemailer';
import { config } from '../config/config.js';


export async function snedEmail({ email, subject, vCode  }) {

  console.log(vCode);
  const transpoter = nodemailer.createTransport({
    host: config.smtp_host,
    service: config.smtp_service,
    port: config.smtp_port,
    auth: {
      user: config.smtp_mail,
      pass: config.smtp_password,
    },
  });

  const mailOption = {
    from: config.smtp_email,
    to: email,
    subject,
    html: vCode ,
  };

  await transpoter.sendMail(mailOption);
}
