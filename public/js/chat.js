let socket = io();

function scrollToBottom () {
    //selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    //heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();
    //check to scroll
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    };
};

socket.on('connect', function () {
    let params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log(`No errors!`);
        };
    });
});

socket.on('disconnect', function () {
    console.log(`Disconnected from Server.`);
});

socket.on('updateUserList', function (users) {
    let ol = jQuery('<ol></ol>');
    users.forEach(function (user) {
        ol.append('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
    console.log(`New Message Received:`, message);
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    console.log(`Location Shared`, message);
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-box').on('submit', function (e) {
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit(`createMessage`, {
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
