// open socket and keep it open
var socket = io();

function scrollToBottom() {
  // selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    console.log('should scroll');

    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  // console.log('connected to server');

  // socket.emit('createEmail', {
  //   to: 'kenn@mastersonwg.com',
  //   text: 'how are you?',
  //   createdAt: 456
  // });

  // socket.emit('createMessage', {
  //   from: 'kenn@mastersonwg.com',
  //   text: 'hey iron man!'
  // });

  var params = $.deparam(window.location.search);

  socket.emit('join', params, function(errors){
    if(errors){
      alert(errors);
      window.location.href = '/';
    } else {
      console.log('no error when join');
    }
  });
}); 

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('updateUserList', function(users){
  // console.log('users list', users);

  var ol = $('<ol></ol>');

  users.forEach(function(user){
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
});

socket.on('newMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    createdAt: formattedTime,
    from: message.from,
    text: message.text
  });

  $('#messages').append(html);

  scrollToBottom();

  // console.log('new message', message);
  // var formattedTime = moment(message.createdAt).format('h:mm a');

  // var li = $('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);

  // $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    createdAt: formattedTime,
    from: message.from,
    url: message.url
  });

  $('#messages').append(html);

  scrollToBottom();

  // console.log('getting newLocationMessage', message);
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = $('<li></li>');
  // var a = $('<a target="_blank">My current location</a>');

  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);

  // $('#messages').append(li);
});

// socket.on('newEmail', function(email){
//   console.log('new email', email);
// });

$('#message-form').on('submit', function(e){
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  // only send message if textbox is not empty
  if(messageTextbox.val() !== ''){
    socket.emit('createMessage', {
      from: 'user',
      text: messageTextbox.val()
    }, function(data){
      // console.log('got it!', data.message);
      messageTextbox.val('');
    });
  }
});

var locationButton = $('#send-location');

locationButton.on('click', function(e){
  if(!navigator.geolocation){
    return alert('geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    // console.log(position);

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('unable to fetch location');
  });
});