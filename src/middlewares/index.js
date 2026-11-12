/* Adds a header containing the time the request arrived at the REST service */
function requestTime(req, res, next) {
  res.setHeader('X-Request-Time', new Date().toISOString());
  next();
}

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found', req.originalUrl);
  next(error);
}

// Express identifies error handlers by their 4-argument signature, so `next` must stay declared.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = {
  requestTime,
  notFound,
  errorHandler,
};
