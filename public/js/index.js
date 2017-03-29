let socket = io();
socket.on('connect', function () {
    console.log(`Connected to Server.`);
});

socket.on('disconnect', function () {
    console.log(`Disconnected from Server.`);
});

socket.on('newMessage', function (message) {
    console.log(`New Message Received:`, message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    console.log(`Location Shared`, message);
    let li = jQuery('<li></li>');
    let a = jQuery(`<a target="_blank">My Location</a>`);
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-box').on('submit', function (e) {
    e.preventDefault();
    socket.emit(`createMessage`, {
        from: `User`,
        text: jQuery('[name=message]').val()
        }, function () {
    });
});

let locationButton = jQuery('#share-location')
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    };
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit(`createLocationMessage`, {
            latitude:  position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
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
