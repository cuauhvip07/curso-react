import express from "express";

const server = express()

// Routing 
server.get('/', (req,res) => {
    res.json('Hola mundo en express')
})

server.post('/',(req,res) => {
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