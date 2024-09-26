import colors from 'colors'
import server from "./server";


// 2. Poner el puerto donde se esta escuchando
const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})