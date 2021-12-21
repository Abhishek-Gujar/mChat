//node server for connections
const io = require('socket.io')(8000,{
    cors: {
        origin: "*"
    }
});
const users = {};

//event if a user is connected
io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });


    //event for sending message
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]});
    });

    //event if a user is disconnected
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    });
});
