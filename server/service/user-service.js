const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../expectations/api-error");

class UserService {
  async registration({ email, password }) {
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw ApiError.badRequest(
        `Пользователь с почтовым адрессом: ${email} уже существует!`
      );
    }

    const activationLink = uuid.v4();

    const rounds = 10;
    const hashedPassword = await bcrypt.hash(password, rounds);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      activationLink,
    });

    if (!newUser) {
      throw ApiError.badRequest("Неизвестная ошибка.");
    }

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(newUser);
    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.badRequest(`Пользователя c ${email} не существует`);
    }

    const isPasswordsEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordsEqual) {
      throw ApiError.badRequest("Неверно заполненые емэйл или пароль");
    }

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.badRequest("Неккоректный токен");
    }
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });

    if (!user) {
      throw new Error("Неккоректная ссылка активации");
    }

    user.isActivated = true;
    await user.save();
  }
}

module.exports = new UserService();
