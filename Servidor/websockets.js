
let connect = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected: ' + socket.id);
    });
};

module.exports = {
    connect
};

