import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

export const db = new Sequelize( process.env.DATABASE_URL ,{
    
})