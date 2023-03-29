const jwt = require("jsonwebtoken");
const Token = require("../models/token-model");

class TokenService {
  async generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const existedToken = await Token.findOne({ refreshToken });

    if (existedToken) {
      existedToken.refreshToken = refreshToken;
      return existedToken.save();
    }

    const newToken = Token.create({ user: userId, refreshToken });

    return newToken;
  }
}

module.exports = new TokenService();
