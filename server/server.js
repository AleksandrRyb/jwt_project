require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

class Server {
  #app;

  constructor() {
    this.app = express();
  }

  async start() {
    try {
      await mongoose.connect(process.env.DB_URL);

      this.app.listen(PORT, () =>
        console.log(`Server has running on port ${PORT}`)
      );
    } catch (error) {
      console.error({ error });
    }
  }
}

module.exports = Server;
