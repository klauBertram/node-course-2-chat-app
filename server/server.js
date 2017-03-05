const express = require('express');
const http = require('http');
const moment = require('moment');
const path = require('path');
const app = express();
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const port = process.env.PORT || 3000;  // heroku port setup
const publicPath = path.join(__dirname, '../public');

var users = new Users();

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

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('name and room name are required');
    }

    socket.join(params.room);
    // leaving room
    // socket.leave(params.room);

    // io.emit - emit to everyone
    // io.to(params.name).emit - emit event to a specific room
    // socket.broadcast - emit to everyone except yourself
    // socket.broadcast.to(params.room) - emit to everyone in the room except yourself
    // socket.emit - emit to 1 user

    // if user joins a room, remove user from any previous joined rooms
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // socket.emit from admin, text - welcome to the chat app
    socket.emit('newMessage', generateMessage('ADMIN', 'Welcome to the chat app'));

    // socket.broadcast.emit from admin, text - new user joined
    // all new message event
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('ADMIN', `${params.name} has joined`));

    callback();
  });

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

    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('ADMIN', `${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});