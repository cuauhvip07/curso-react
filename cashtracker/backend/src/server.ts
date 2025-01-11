import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from './routes/budgetRouter'
import authRouter from './routes/authRouter'


// Despues de poner la variable de entonor y cración de la bd, se debe de conectar 

async function connectDB(){
    try {
        await db.authenticate()
        db.sync() // Nos crea las tablas y columnas
        console.log(colors.blue.bold('Conexión exitosa a la BD'))
    } catch (error) {
        console.log(colors.red.bold('Fallo la conexión a la BD'))
    }
}

connectDB()

const app = express()

app.use(morgan('dev')) // Informacion detalla del log


app.use(express.json()) // Poder leer los formularios

app.use('/api/budgets', budgetRouter)
app.use('/api/auth', authRouter)


export default app