require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const errorMiddleware = require("./middlewares/error-middleware");

const router = require("./router/index");

const PORT = process.env.PORT || 5000;

class Server {
  #app;

  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
      })
    );
    this.app.use("/api", router);
    this.app.use(errorMiddleware);
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

module.exports = new Server();
