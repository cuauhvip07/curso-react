
import express from 'express'

const server = express()

// Routing 
server.get('/', (req,res) => {

    const data = [
        {id: 1, nombre: 'Cuauh'},
        {id: 2, nombre: 'Villalba'}
    ]

    // Mandar datos hacia la pantalla
    res.send(data)
})

export default server

