
import { Request, Response} from 'express'
import Product from '../models/Product.model'

export const createProduct = async (req : Request, res: Response) => {

    // Mandar datos hacia la pantalla
    // res.send(data)    Esta es otra manera para mandar los datos

    // req.body nos da la informacoin del body enviado desde postman

    const product = await Product.create(req.body) // crea la instancia y lo inserta en la bd

    // const product = new Product(req.body)    Otra manera de hacerlo
    // product.save()


    res.json({data: product}) // Respuesta despues de la insercion
    
    
}