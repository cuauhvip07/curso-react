
import { Request, Response} from 'express'
import Product from '../models/Product.model'
import { check } from 'express-validator'

export const createProduct = async (req : Request, res: Response) => {

    // Validacion de una manera

    // await check('name').notEmpty().withMessage('El nombre del producto no puede ir vacio').run(req)

    // await check('price').
    //     custom( value => value > 0).withMessage('Precio no valido').
    //     isNumeric().withMessage('El valor debe ser numerico').
    //     notEmpty().withMessage('El precio del producto no puede ir vacio')
    // .run(req)


    

    // Mandar datos hacia la pantalla
    // res.send(data)    Esta es otra manera para mandar los datos
    // req.body nos da la informacoin del body enviado desde postman

    try {
        const product = await Product.create(req.body) // crea la instancia y lo inserta en la bd
        // const product = new Product(req.body)    Otra manera de hacerlo
        // product.save()
        res.json({data: product}) // Respuesta despues de la insercion
    } catch (error) {
        console.log(error)
    }

    
    
    
}