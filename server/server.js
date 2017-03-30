const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require(`./utils/message`);
const {isRealString} = require(`./utils/validation`);
const {Users} = require(`./utils/users`);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

// INITIATE SOCKETCHAT
io.on('connection', (socket) => {
    console.log(`New user connected.`);

    // JOIN SOCKETCHANNEL
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.channel)) {
            return callback('Username and SocketChannel are required.')
        };
        socket.join(params.channel);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.channel);

        io.to(params.channel).emit('updateUserList', users.getUserList(params.channel));

        // socket.leave(params.channel);

        //io.emit to all users --> io.to(params.channel).emit
        //socket.broadcast.emit to everyone connected to server except current --> socket.broadcast.to(params.channel).emit
        //socket.emit to one user --> same

        //WELCOME MESSAGES
        socket.emit('newMessage', generateMessage(`Admin`, `Welcome to the SocketChat!`));

        socket.broadcast.to(params.channel).emit('newMessage', generateMessage(`Admin`, `${params.name} joined channel.`));

        callback();
    });

// MESSAGES
    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.channel).emit(`newMessage`, generateMessage(user.name, message.text));
        }
        callback();
    });

// LOCATION SHARE
    socket.on(`createLocationMessage`, (coords) => {
        let user = users.getUser(socket.id);
        if(user) {
        io.to(user.channel).emit(`newLocationMessage`, generateLocationMessage(user.name, coords.latitude,coords.longitude));
        }
    });

    socket.on('disconnect', (socket) => {
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.channel).emit('updateUserList', users.getUserList(user.channel));
            io.to(user.channel).emit('newMessage', generateMessage(`Admin`, `${user.name} left ${user.channel}.`));
        }
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
