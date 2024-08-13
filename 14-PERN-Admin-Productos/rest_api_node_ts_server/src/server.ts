
import express from 'express'
import router from './router'
import db from './config/db'

// 3. Concertar a la base de datos

async function connectDB() {
    try {
        // Autenticamos en nuestra base de datos
        await db.authenticate()
        // si agregamos nuevas columnas las va agregando
        db.sync() 
        console.log('Conexion exitosa a la base de datos')
    } catch (error) {
        console.log(error)
        console.log('Hubo un error en conectar a la base de datos')
    }
}

connectDB()

// 1. Creacion del server
const server = express()

// 2 .use es engloba todos los verbos http (get,post,delete,etc)
server.use('/api/products',router)

export default server