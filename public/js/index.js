// open socket and keep it open
var socket = io();

socket.on('connect', function() {
  console.log('connected to server');

  // socket.emit('createEmail', {
  //   to: 'kenn@mastersonwg.com',
  //   text: 'how are you?',
  //   createdAt: 456
  // });

  // socket.emit('createMessage', {
  //   from: 'kenn@mastersonwg.com',
  //   text: 'hey iron man!'
  // });
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message){
  // console.log('new message', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

// socket.on('newEmail', function(email){
//   console.log('new email', email);
// });

$('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'user',
    text: $('[name=message]').val()
  }, function(data){
    console.log('got it!', data.message);
  });
});