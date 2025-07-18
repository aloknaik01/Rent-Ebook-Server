import mongoose from 'mongoose';

const useSchema = new mongoose.Schema(
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

useSchema.methods.generateVerificationCode = function () {
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
export const User = mongoose.model('User', useSchema);
