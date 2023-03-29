const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");

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
  }
}

module.exports = new UserService();
