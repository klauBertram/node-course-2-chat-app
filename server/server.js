const express = require('express');
const http = require('http');
const moment = require('moment');
const path = require('path');
const app = express();
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);

const { generateMessage, generateLocationMessage } = require('./utils/message');
const port = process.env.PORT || 3000;  // heroku port setup
const publicPath = path.join(__dirname, '../public');


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
  socket.emit('newMessage', generateMessage('ADMIN', 'Welcome to the chat app'));

  // socket.broadcast.emit from admin, text - new user joined
  // all new message event
  socket.broadcast.emit('newMessage', generateMessage('ADMIN', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('create message', message);

    // socket.emit - emits to a single connection
    // io.emit - emits to everyone
    io.emit('newMessage', generateMessage(message.from, message.text));
    // console.log('about to call callback', new Date().getTime());
    // this call the callback function defined by the client
    // can send anything back, most likely an object, example wise, we'll use string
    callback({
      message: 'this is from the server'
    });

    // broadcasting - emit to everyone except 1 user
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime( )
    // });

    // socket.emit('newMessage', {
    //   from: message.from + ' (returned)',
    //   text: message.text,
    //   createdAt: new Date()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});