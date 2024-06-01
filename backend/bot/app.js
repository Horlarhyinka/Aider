const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
// const helmet = require('helmet');
// const logger = require('./logger');
const cors = require("cors");
// const path = require('path');
// const { useQueue } = require('./lib/amqp');
// const queues = require('./constants/queues');
const app = express();
const port = process.env.PORT || 3000;

const chatbot = require("./controller");

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(helmet());
app.use(morgan("combined"));
app.use(cors());

app.post("/api/chats", chatbot);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
