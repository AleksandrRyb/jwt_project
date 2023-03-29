const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw new Error(
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
      throw new Error("Неизвестная ошибка.");
    }

    await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(newUser);
    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
}

module.exports = new UserService();
