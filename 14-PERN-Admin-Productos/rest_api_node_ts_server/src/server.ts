import express from "express";
import { router } from "./router";

const server = express()

// .use() ejecuta en cada uno de los router
// Se pasan los parametros
server.use('/api/products', router) 

export default server