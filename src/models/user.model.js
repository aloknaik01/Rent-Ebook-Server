import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
    },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    borrowedBooks: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Borrow',
        },
        returned: {
          type: Boolean,
          default: false,
        },
        bookTitle: String,
        type: String,
        borrowedDate: Date,
        dueDate: Date,
      },
    ],
    avatar: {
      public_id: String,
      url: String,
    },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateVerificationCode = function () {
  function gneraeteRandom5digitCode() {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const restDigits = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(4, 0);

    return parseInt(firstDigit + restDigits);
  }
  const verificationCode = gneraeteRandom5digitCode();
  this.verificationCode = verificationCode;
  this.verificationCodeExpire = Date.now() + 15 * 60 * 1000;

  return verificationCode;
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this.id,
    },
    config.jwt_secret_key,
    {
      expiresIn: config.cookie_expires,
    }
  );
};

userSchema.methods.getResetPassToken = function () {
  const reseToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(reseToken).digest('hex');

  this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;
  return reseToken;
};

export const User = mongoose.model('User', userSchema);
