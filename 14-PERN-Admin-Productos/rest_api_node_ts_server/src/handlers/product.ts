
import { Request, Response } from "express"
import { check, validationResult } from "express-validator"
import Product from "../models/Product.model"

// 11. Se crea la funcion

export const createProduct = async (req : Request, res: Response) => {

    // 13. Validacion
    await check('name').notEmpty().withMessage('El nombre del producto no puede ir vacio').run(req)

    await check('price')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .isNumeric().withMessage('Valor no valido')
        .custom(valor => valor > 0).withMessage('Precio no valido')
    .run(req)

    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    // en el server se pone para habilitar la lectura del req.body, si no se pone marca undefinded
    const product = await Product.create(req.body)
   
    res.json({data: product})
}