module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const mas = Object.values(err.errors)[0];
    err.statusCode = 422;
    err.message = mas;
  } else if (err.name == "MongoServerError" && err.code == 11000) {
    err.statusCode = 409;
    err.message = "email already exist";
  }
  const statusErrorCode = err.statusCode || 500;
  const handeledError = err.statusCode < 500;
  const handeledMessage = err?.message?.properties?.message
    ? err.message.properties.message
    : err.message;
  res.status(statusErrorCode).send({
    message: handeledError ? handeledMessage : "something went wrong",
    errors: err.errors || [],
  });
};
