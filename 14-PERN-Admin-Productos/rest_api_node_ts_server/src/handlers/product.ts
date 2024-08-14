
import { Request, Response} from 'express'
import Product from '../models/Product.model'
import { check,validationResult } from 'express-validator'

export const createProduct = async (req : Request, res: Response) => {

    // Validacion
    await check('name').notEmpty().withMessage('El nombre del producto no puede ir vacio').run(req)

    await check('price').
        custom( value => value > 0).withMessage('Precio no valido').
        isNumeric().withMessage('El valor debe ser numerico').
        notEmpty().withMessage('El precio del producto no puede ir vacio')
    .run(req)


    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    // Mandar datos hacia la pantalla
    // res.send(data)    Esta es otra manera para mandar los datos

    // req.body nos da la informacoin del body enviado desde postman

    const product = await Product.create(req.body) // crea la instancia y lo inserta en la bd

    // const product = new Product(req.body)    Otra manera de hacerlo
    // product.save()


    res.json({data: product}) // Respuesta despues de la insercion
    
    
}