
import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'


// 1. Creacion del server
const server = express()

//  4. Leer datos del formulario que se mandan desde postman
server.use(express.json())

// 2 .use es engloba todos los verbos http (get,post,delete,etc)
server.use('/api/products',router)



// 3. Conectar a la base de datos

async function connectDB() {
    try {
        // Autenticamos en nuestra base de datos
        await db.authenticate()
        // si agregamos nuevas columnas las va agregando
        db.sync() 
        console.log(colors.blue('Conexion exitosa a la base de datos'))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Hubo un error en conectar a la base de datos'))
    }
}

connectDB()



export default server