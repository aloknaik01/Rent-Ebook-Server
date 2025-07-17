import nodemailer from 'nodemailer';

export async function snedEmail({ email, subject, message }) {
  const transpoter = nodemailer.createTransport({
    host: smtp_host,
    service: smtp_service,
    port: sptp_port,
    auth: {
      user: smtp_user,
      pass: smtp_password,
    },
  });

  const mailOption = {
    from: smtp_email,
    to: email,
    subject,
    html: message,
  };

  await transpoter.sendMail(mailOption);
}
