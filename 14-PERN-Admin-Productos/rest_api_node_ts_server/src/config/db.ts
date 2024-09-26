// 8. Se instala sequilize-typescript para tener los decoradores
import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'

// 5. Instalar dependencias y la conexion a la bd
// Se le agrega esto a la url ?ssl=true para que no marque error

// 7. Se instala dotenv y se crea la variable de entorno en el .env

dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL, { // Se importan los modelos
    models: [__dirname + '/../models/**/*.ts']
})

export default db;