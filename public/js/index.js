let socket = io();
socket.on('connect', function() {
    console.log(`Connected to Server!`);

    socket.on('newMessage', function(message) {
        console.log(`New Message Received:`, message);
    });
});    

socket.on('disconnect', function() {
    console.log(`Disconnected from Server.`);
});

// socket.on('newEmail', function(email) {
//     console.log(`New Email Received:`, email);
// });
