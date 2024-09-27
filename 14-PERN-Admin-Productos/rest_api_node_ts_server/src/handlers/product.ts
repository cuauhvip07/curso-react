
import { Request, Response } from "express"
import Product from "../models/Product.model"

// 11. Se crea la funcion

export const createProduct = async (req : Request, res: Response) => {
    
    // en el server se pone para habilitar la lectura del req.body, si no se pone marca undefinded
    const product = await Product.create(req.body)
   
    res.json({data: product})
}