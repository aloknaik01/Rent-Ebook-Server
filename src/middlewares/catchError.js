export const catchError = func => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
};
