const ApiError = require("../expectations/api-error");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(ApiError.unauthrizedError());
    }
    console.log(authorization);
    const accessToken = authorization.split(" ")[1];

    if (!accessToken) {
      return next(ApiError.unauthorizedError());
    }

    console.log(accessToken);

    const userData = tokenService.valudateAccessToken(accessToken);

    console.log(userData);
    if (!userData) {
      return next(ApiError.unauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.unauthorizedError());
  }
};
