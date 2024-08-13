
import express from 'express'

const server = express()

// Routing 
server.get('/', (req,res) => {

    // Mandar datos hacia la pantalla
    // res.send(data)    Esta es otra manera para mandar los datos
    res.json('Desde get')
})

server.post('/', (req,res) => {

    res.json('Desde post')
})

server.put('/', (req,res) => {

    res.json('Desde put')
})

server.patch('/', (req,res) => {

    res.json('Desde patch')
})

server.delete('/', (req,res) => {

    res.json('Desde delete')
})

export default server

