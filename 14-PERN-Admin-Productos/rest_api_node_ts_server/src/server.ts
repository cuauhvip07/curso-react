import express from "express";

const server = express()

// Routing 
server.get('/', (req,res) => {
    res.json('Hola mundo en express')
})



export default server