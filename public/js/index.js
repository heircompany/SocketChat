let socket = io();
socket.on('connect', function () {
    console.log(`Connected to Server.`);
});

socket.on('disconnect', function () {
    console.log(`Disconnected from Server.`);
});

socket.on('newMessage', function (message) {
    console.log(`New Message Received:`, message);
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let li = jQuery('<li></li>');
    li.text(`${formattedTime}: ${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    console.log(`Location Shared`, message);
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let li = jQuery('<li></li>');
    let a = jQuery(`<a target="_blank">My Location</a>`);
    li.text(`${formattedTime}: ${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-box').on('submit', function (e) {
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit(`createMessage`, {
        from: `User`,
        text: messageTextbox.val()
        }, function () {
            messageTextbox.val('')
    });
});

let locationButton = jQuery('#share-location')
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    };

    locationButton.attr('disabled', 'disabled').text('Sharing location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Share location');
        socket.emit(`createLocationMessage`, {
            latitude:  position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Share location');
        alert(`Cannot fetch location without permission!`);
    });
});

// socket.on('newEmail', function(email) {
//     console.log(`New Email Received:`, email);
// });

// socket.emit(`createMessage`, {
//     from: `joe`,
//     text: `sup nerd`
// }, function(data) {
//     console.log(`thanks... `, data);
// });
