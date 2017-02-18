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

socket.on('newLocationMessage', function(message){
  console.log('getting newLocationMessage', message);
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);

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

var locationButton = $('#send-location');

locationButton.on('click', function(e){
  if(!navigator.geolocation){
    return alert('geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    // console.log(position);

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    alert('unable to fetch location');
  });
});