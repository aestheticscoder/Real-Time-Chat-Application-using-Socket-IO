const { Socket } = require('socket.io');

//  node server which will handle socket io connections
const io = require('socket.io')(8000)
const users = {};
io.on('connection', Socket => {
    Socket.on('New-User-Joined', name => {
        users[Socket.id] = name;
        Socket.broadcast.emit('User-Joined', name);
    });

    Socket.on('send', message => {
        Socket.broadcast.emit('receive', { message: message , name: users[Socket.id]});
    });

    Socket.on('disconnect', message => {
        Socket.broadcast.emit('left', users[[socket.id]]);
        delete users[socket.id];
    });


});