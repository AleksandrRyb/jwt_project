class UserController {
  async registration(req, res, next) {
    try {
    } catch (error) {}
  }

  async login(req, res, next) {
    try {
    } catch (error) {}
  }

  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }

  async getUsers(req, res, next) {
    try {
      res.json({ message: "Hello world" });
    } catch (error) {}
  }
}

module.exports = new UserController();