import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);
app.use(
  cors({
    origin: [config.portfolio_url],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
