import { catchError } from '../middlewares/catchError.js';
import ErrorHandler from '../middlewares/error.middleware.js';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { sendVerificationCode } from '../utils/sendVerificationCode.js';
import { sendToken } from '../utils/sendToken.js';

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

export const verifyOtp = catchError(async (req, res, next) => {
  const { email, otp } = req.body || {};

  if (!email || !otp) {
    return next(new ErrorHandler('Email or otp is missing', 400));
  }

  try {
    const userAllEntries = await User.find({ email, accountVerified: false }).sort({
      createdAt: -1,
    });

    if (!userAllEntries) {
      return next(new ErrorHandler('User not found!', 400));
    }

    let user;

    if (userAllEntries > 1) {
      user = userAllEntries[0];
      await user.deleteMany({
        _id: {
          $ne: user._id,
        },
        email,
        accountVerified: false,
      });
    } else {
      user = userAllEntries[0];
    }

    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler('invalid otp', 400));
    }

    const currentTime = Date.now();

    const verificationCodeExpire = new Date(user.verificationCodeExpire).getTime();

    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler('OTP expired', 400));
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;

    await user.save();

    await user.save({
      validateModifiedOnly: true,
    });

    sendToken(user, 200, 'Account Verified.', res);
  } catch (error) {
    return next(new ErrorHandler('Internal server Error', error));
  }
});

//login
export const login = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('Please enter all fields', 400));
  }

  const user = await User.findOne({ email, accountVerified: true }).select('password');

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 400));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 400));
  }

  sendToken(user, 200, 'User logged in successfully', res);
});

//logout
export const logout = catchError(async (req, res, next) => {
  res
    .status(200)
    .cookie('token', '', {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: 'Logged out successfully',
    });
});

//getuser
export const getUser = catchError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
