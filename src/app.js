import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import { connecToDb } from './database/db.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
export const app = express();
import AuthRouter from './routes/auth.route.js';

app.use(
  cors({
    origin: [config.portfolio_url],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);

app.use('/auth', AuthRouter);
connecToDb();

app.use(errorMiddleware);
