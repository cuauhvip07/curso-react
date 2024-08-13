import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()


// console.log(process.env)  nos da las varibales y para acceder a la que creamos en .env le ponemos el nombre
const db = new Sequelize(process.env.DATABASE_URL,{
    models: [__dirname + '/../models/**/*.ts']
}) 

export default db;