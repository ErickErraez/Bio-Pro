import Server from "./classes/server";
import useRoute from "./routes/usuario";

const server = new Server();

server.app.use('/user',useRoute);

//levantar express
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
})