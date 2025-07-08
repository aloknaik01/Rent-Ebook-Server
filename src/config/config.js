import { config as conf } from 'dotenv';
conf();

const _config = {
  port: process.env.PORT || 3000,
  portfolio_url: process.env.PORTFOLIO_URL,
  mongo_uri: process.env.MONGO_URI,

};

export const config = Object.freeze(_config);
