const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require(`./utils/message`);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

// INITIATE SOCKETCHAT
io.on('connection', (socket) => {
    console.log(`New user connected.`);

//WELCOME MESSAGES
    socket.emit('newMessage', generateMessage(`Admin`, `Welcome to the SocketChat!`));

    socket.broadcast.emit('newMessage', generateMessage(`Admin`, `New SocketChatter joined`));

// MESSAGES
    socket.on('createMessage', (message, callback) => {
        console.log(`createMessage`, message);
        io.emit(`newMessage`, generateMessage(message.from, message.text));
        callback(`I think you're ghey`);
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: newDate().getTime()
        // });
    });

    socket.on('disconnect', (socket) => {
        console.log(`User was disconnected.`);
    });
});

server.listen(port, () => {
  console.log(`Application launched on port:${port}`);
});

module.exports = {app};

// initial deploy to github from CLI
// git init
// git add .
//  git commit -m "initial"
// git remote add origin git@github.com:heircompany/SocketChat.git
// git push -u origin master

// deploy to heroku from CLI
// heroku create
// git push heroku master

// socket.emit('newEmail', {
//     from: `joegrotto@heir.company`,
//     text: `hey dude`,
//     createdAt: 123
// });
//
// socket.on('createEmail', (newEmail) => {
//     console.log(`createEmail`, newEmail);
// });
