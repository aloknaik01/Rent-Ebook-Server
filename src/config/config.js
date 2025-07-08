import { config as conf } from 'dotenv';
conf();

const _config = {
  port: process.env.PORT || 3000,
  portfolio_url: process.env.PORTFOLIO_URL,
};

export const config = Object.freeze(_config);
