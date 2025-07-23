import { config } from '../config/config.js';

export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();
  res
    .status(statusCode)
    .cookie('token', token, {
      expires: new Date(Date.now() + config.cookie_expires * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      user,
      message,
    });
};
