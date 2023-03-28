require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

class Server {
  #app;

  constructor() {
    this.app = express();
  }

  async start() {
    try {
      this.app.listen(PORT, () =>
        console.log(`Server has running on port ${PORT}`)
      );
    } catch (error) {
      console.error({ error });
    }
  }
}

module.exports = Server;
