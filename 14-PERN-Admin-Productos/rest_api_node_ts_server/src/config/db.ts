import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()


// console.log(process.env)  nos da las varibales y para acceder a la que creamos en .env le ponemos el nombre
const db = new Sequelize(process.env.DATABASE_URL) // Se le agrega el ?ssl=true para que ya no de error a la conexión de la bd

export default db;