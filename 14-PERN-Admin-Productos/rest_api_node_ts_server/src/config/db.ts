import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

// 5. Instalar dependencias y la conexion a la bd
// Se le agrega esto a la url ?ssl=true para que no marque error

// 7. Se instala dotenv y se crea la variable de entorno en el .env

dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL)

export default db;