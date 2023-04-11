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
    const existedToken = await Token.findOne({ user: userId });

    if (existedToken) {
      existedToken.refreshToken = refreshToken;
      return existedToken.save();
    }

    const newToken = await Token.create({ user: userId, refreshToken });

    return newToken;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken });

    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });

    return tokenData;
  }

  valudateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  valudateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
