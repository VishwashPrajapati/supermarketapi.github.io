const mongoose = require("mongoose");
var express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
//var io = require('socket.io')(3000);
var app = express();

// Init App and Socket
// var app = express(),
//   server = require('http').createServer(app),
//   io = io.listen(server, {
//     serveClient: false,
//     // below are engine.IO options
//     pingInterval: 10000,
//     pingTimeout: 5000,
//     cookie: false,
//   });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting Down");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

app = require("./app");
app.use(cors({ origin: "*" }));

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successful"));

const port = process.env.PORT || 5000;

server = app.listen(port, () => console.log(`app running on port ${port}`));
//var io = require('socket.io').listen(server);
//initializing the socket of socket.js
// var socket = require('./socket');
// socket.start(io);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDELED REJECTION! shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
