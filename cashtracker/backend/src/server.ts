import express from 'express'
import colors from 'colors'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev')) // Informacion detalla del log


app.use(express.json()) // Poder leer los formularios


export default app