const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;  // heroku port setup
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketIO(server);

// console.log(__dirname + '/../public');
// console.log(publicPath);

// static directory
app.use(express.static(publicPath));

// reigster socket listener
io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});