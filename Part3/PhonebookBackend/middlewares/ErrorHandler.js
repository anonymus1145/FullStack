// Catch error when conecting to database
const ErrorHandler = (err, req, res, next) => {
  console.log("Middleware Error Hadnling");
  const errStatus = err.statusCode || 400;
  const errMsg = err.message || "Malformatted request to Database!";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {}
  });
};

module.exports = ErrorHandler;
