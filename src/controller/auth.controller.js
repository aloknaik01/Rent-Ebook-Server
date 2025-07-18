import { catchError } from '../middlewares/catchError.js';
import ErrorHandler from '../middlewares/error.middleware.js';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { sendVerificationCode } from '../utils/sendVerificationCode.js';

export const register = catchError(async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return next(new ErrorHandler('Please fill full form!', 400));
    }

    const isRegistered = await User.findOne({ email, accountVerified: true });

    if (isRegistered) {
      return next(new ErrorHandler('User already exists!', 400));
    }

    const registerattemptByUser = await User.find({ email, accountVerified: false });

    if (registerattemptByUser.length > 3) {
      return next(new ErrorHandler('You have Exceeded number of attepmts!', 400));
    }

    if (password.length < 8 || password.length > 10) {
      return next(new ErrorHandler('Password must be in Between 8 to 10 characters', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const verificationCode = await user.generateVerificationCode();
    await user.save();

    sendVerificationCode(verificationCode, email, res);
  } catch (error) {
    return next(error);
  }
});
