
import express from 'express'
import router from './router'

const server = express()

//  .use es engloba todos los verbos http (get,post,delete,etc)
server.use('/api/products',router)

export default server