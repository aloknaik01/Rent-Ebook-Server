class ErrorHandler extends Error {
  constructor(message, statuCode) {
    super(message);
    this.statuCode = statuCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || 'Internal Server Error!';
  err.statuCode = err.statuCode || 500;

  if (err.code === 11000) {
    const statuCode = 400;
    const message = `Duplicate field value Enterd`;
    err = new ErrorHandler(message, statuCode);
  }

  if (err.name === 'JsonWebTokenError') {
    const statuCode = 400;
    const message = `Json Web Token in Invalid! Try again.`;
    err = new ErrorHandler(message, statuCode);
  }

  if (err.name === 'TokenExpiredError') {
    const statuCode = 400;
    const message = `Json Web Token in Invalid! Try again.`;
    err = new ErrorHandler(message, statuCode);
  }

  if (err.name === 'CastError') {
    const statuCode = 400;
    const message = `Resource Not Found!, Invalid ${err.path}`;
    err = new ErrorHandler(message, statuCode);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map(error => error.message)
        .join(' ')
    : err.message;

  return res.status(err.statuCode).json({
    success: false,
    message: errorMessage || 'Internal server Error',
  });
};

export default ErrorHandler;
