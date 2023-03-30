const userService = require("../service/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      const result = await userService.registration(req.body);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async login(req, res, next) {
    try {
    } catch (error) {}
  }

  async logout(req, res, next) {
    try {
    } catch (error) {}
  }

  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }

  async activate(req, res, next) {
    try {
    } catch (error) {}
  }

  async getUsers(req, res, next) {
    try {
    } catch (error) {}
  }
}

module.exports = new UserController();
