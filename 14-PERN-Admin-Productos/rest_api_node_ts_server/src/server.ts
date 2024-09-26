import express from "express";
import { router } from "./router";
import db from "./config/db";

// 6. Conectar a bd
async function connectDB() {
    try {
        await db.authenticate()
        db.sync() // Agrega nuevas columnas a la bd en caso de requierilas
        console.log('Conexion exitosa ala bd')
    } catch (error) {
        console.log(error)
        console.log('Hubo un error en conectar a la bd')
    }
}

connectDB()

// 1. Creacion del server y pasarlo al index
const server = express()

// 3. Crear archivo de rutas y pasarlas
// .use() ejecuta en cada uno de los router
// Se pasan los parametros
server.use('/api/products', router) 

export default server