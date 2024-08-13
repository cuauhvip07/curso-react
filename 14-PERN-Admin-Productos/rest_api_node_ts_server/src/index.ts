import colors from 'colors'
import server from "./server";

// La asignacion que nos da cuando se suba a produccion
const port = process.env.port || 4000

server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})