const socketio = require('socket.io')
module.exports = (server) => {
    const io = socketio(server, {
        cors: {
            origin: "*",
            credentials: true
        }
    });
    console.log(`socket running`);
    io.on("connection", function (socket) {
        socket.on("sender-join", function (data) {
            socket.join(data.uid);
        });
        socket.on("receiver-join", function (data) {
            socket.join(data.uid);
            socket.in(data.sender_uid).emit("init", data.uid);
        });
        socket.on("file-meta", function (data) {
            socket.in(data.uid).emit("fs-meta", data.metadata);
        });
        socket.on("fs-start", function (data) {
            socket.in(data.uid).emit("fs-share", {});
        });
        socket.on("file-raw", function (data) {
            socket.in(data.uid).emit("fs-share", data.buffer);
        })
    });
}