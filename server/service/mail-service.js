const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "",
      port: "",
      auth: {
        user: "",
        pass: "",
      },
    });
  }

  async sendActivationMail(to, link) {}
}

module.exports = new MailService();
