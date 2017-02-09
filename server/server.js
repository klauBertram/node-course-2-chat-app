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

  // socket.emit('newEmail', {
  //   from: 'tony@si.com',
  //   text: 'wassup?',
  //   createdAt: 123
  // });

  // socket.on('createEmail', (email) => {
  //   console.log('create email', email);
  // });

  // socket.emit('newMessage', {
  //   from: 'tony@si.com',
  //   text: 'I am iron man',
  //   createdAt: new Date()
  // });

  // socket.emit from admin, text - welcome to the chat app
  socket.emit('newMessage', {
    from: 'ADMIN',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  // socket.broadcast.emit from admin, text - new user joined
  // all new message event
  socket.broadcast.emit('newMessage', {
    from: 'ADMIN',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('create message', message);

    // socket.emit - emits to a single connection
    // io.emit - emits to everyone
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // broadcasting - emit to everyone except 1 user
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    // socket.emit('newMessage', {
    //   from: message.from + ' (returned)',
    //   text: message.text,
    //   createdAt: new Date()
    // });
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});