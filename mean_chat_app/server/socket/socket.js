const express = require('express');
const app = express();
const socket = require('socket.io');

let userModel = require('../schemas/users');

const port = 8100;

const server = app.listen(port, () => {
    console.log("Socket server running on port " + port);
});
const io = socket.listen(server);   

io.sockets.on('connection', (socket) => {
    console.log('Connection established', 'socket', socket.handshake.query, 'socket id', socket.id);

    userModel.findOneAndUpdate({ _id: socket.handshake.query.id }, { socket_id: socket.id }, { new: true }).exec((err, result) => {
        if(err) {
            console.log('err updation socket id', err)
        } else {
            console.log('Updated')
        }
    })

    socket.on('join', (data) => {
        console.log('Join request', socket.id, 'data', data);        
        socket.join(data.room);
        io.to(socket.id).emit('joined-room', { message: data.user + ' joined ' + data.room });
        // io.in(data.room).emit('joined-room', { message: data.user + ' joined ' + data.room })
    })

})