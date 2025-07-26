import jwt from 'jsonwebtoken';
import { catchError } from './catchError.js';
import ErrorHandler from './error.middleware.js';
import { config } from '../config/config.js';
import { User } from '../models/user.model.js';

export const isAuth = catchError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return new (ErrorHandler('User is Not Authenicated', 400))();
  }

  const decodeData = jwt.verify(token, config.jwt_secret_key);
  req.user = await User.findById(decodeData.id);
  next();
});
