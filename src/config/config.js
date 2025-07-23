import { config as conf } from 'dotenv';
conf();

const _config = {
  port: process.env.PORT || 3000,
  portfolio_url: process.env.PORTFOLIO_URL,
  mongo_uri: process.env.MONGO_URI,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_service: process.env.SMTP_SERVICE,
  smtp_mail: process.env.SMTP_MAIL,
  smtp_password: process.env.SMTP_PASSWORD,
};

export const config = Object.freeze(_config);
