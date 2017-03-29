const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log(`New user connected.`);

    socket.on('disconnect', (socket) => {
        console.log(`User was disconnected.`);
    });
});

server.listen(port, () => {
  console.log(`Application launched on port:${port}`);
});

module.exports = {app};

// deploy to github from CLI
// git init
// git add .
//  git commit -m "initial"
// git remote add origin git@github.com:heircompany/SocketChat.git
// git push -u origin master

// deploy to heroku from CLI
// heroku create
// git push heroku master
