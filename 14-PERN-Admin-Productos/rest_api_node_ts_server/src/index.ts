import server from "./server";


// 2. Poner el puerto donde se esta escuchando
server.listen(4000, () => {
    console.log('REST API en el puerto 4000')
})