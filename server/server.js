const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = 5000;

class Server {
  #app;

  constructor() {
    this.app = express();
  }

  async start() {
    try {
      this.app.listen(PORT, (port) =>
        console.log(`Server has running on port ${port}`)
      );
    } catch (error) {
      console.error({ error });
    }
  }
}

module.exports = Server;
