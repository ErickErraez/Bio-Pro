;
const app = require('./app/app');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 100000}));

const server = http.createServer(app);

process.env.PORT = process.env.PORT || 1999;

server.listen(process.env.PORT, () => {
    console.log(`El servidor esta iniciado en el puerto: ${process.env.PORT}`)
});
const io = socketIo.listen(server);
const socket = require('./websockets');
socket.connect(io);





