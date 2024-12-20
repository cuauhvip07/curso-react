import express from "express";
import cors, { CorsOptions} from 'cors'
import { router } from "./router";
import db from "./config/db";
import colors from 'colors'
import morgan from 'morgan'

// 6. Conectar a bd
async function connectDB() {
    try {
        await db.authenticate()
        db.sync() // Agrega nuevas columnas a la bd en caso de requierilas
        // console.log(colors.blue('Conexion exitosa a la BD'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red('Hubo un error en conectar a la bd'))
    }
}

connectDB()

// 1. Creacion del server y pasarlo al index
const server = express()

// 12. Leer datos del formulario -> Habilita la lectura
server.use(express.json())

// Permitir conexiones
const corsOptions : CorsOptions = {
    // callback permite la conexión o negar la conexión
    origin: function(origin, callback) { // Quien me esta enviando la petición
        if(origin === process.env.FRONTEND_URL){
            callback(null,true)
        }
        else{
            callback(new Error('Error de CORS'),false)
        }
    } 
}
server.use(cors(corsOptions)) // Ejecuta en todo tipo de peticion el .use

server.use(morgan('dev'))

// 3. Crear archivo de rutas y pasarlas
// .use() ejecuta en cada uno de los router
// Se pasan los parametros
server.use('/api/products', router) 

// 20.  Pruebas 
server.get('/api',(req,res) => {
    res.json({msg: 'Desde API'})
})

export default server