const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

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

    const newUser = User.create({ email, password: hashedPassword });
  }
}

module.exports = new UserService();
