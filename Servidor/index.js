;
const app = require('./app/app');
const bodyParser = require('body-parser');
const http = require('http');

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 100000}));

const server = http.createServer(app);

process.env.PORT = process.env.PORT || 5008;

server.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT}`)
});





