
import { Request, Response, NextFunction } from "express"
import Product from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
    
    try {
        const products = await Product.findAll({
            order: [
                // ['id','DESC']
                ['id','DESC'], 
                // ['price','DESC'], 
            ],
            // limit: 2,
            // attributes: {exclude:['createdAt','updatedAt','availability']}
        })
        res.json({data:products})
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            // Enviar respuesta 404 si no se encuentra el producto
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        // Enviar respuesta con el producto
        res.json({ data: product });
    } catch (error) {
        // Delegar el manejo de errores al middleware de manejo de errores
        next(error);
    }
};


// 11. Se crea la funcion

export const createProduct = async (req : Request, res: Response, next: NextFunction) => {

    // // 13. Validacion
    // await check('name').notEmpty().withMessage('El nombre del producto no puede ir vacio').run(req)

    // await check('price')
    //     .notEmpty().withMessage('El precio no puede ir vacio')
    //     .isNumeric().withMessage('Valor no valido')
    //     .custom(valor => valor > 0).withMessage('Precio no valido')
    // .run(req)

    // Este codigo de validacion se pasa hacia el middleware en el paso 14

    // let errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors: errors.array()})
    // } 
    
    // en el server se pone para habilitar la lectura del req.body, si no se pone marca undefinded
    
    try {
        const product = await Product.create(req.body)
        res.status(201).json({data: product})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const updateProduct = async (req : Request,res : Response, next: NextFunction) : Promise<void> => {

    try {
        // params -> Parametro que se manda del id de la url
        // id -> Nombre que se le asigna en el routerx
       const { id } = req.params
       const product = await Product.findByPk(id)

        if(!product){
            res.status(404).json({error: 'Producto no encontrado'})
            return
        }

       // Actualizar
       await product.update(req.body) // Modificaciones totales
       await product.save()

       res.json({data: product})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// PATCH -> Solo remplaza los valores que le mandas, no elimina los demas valores
export const updateAvailability = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product){
            res.status(404).json({error:'Producto no encontrado'})
            return
        }

        // dataValues -> Te trae el valor de tu consulta que hagas en tu request
        // Aqui se cambia la disponibilidad de forma automatica
        product.availability = !product.dataValues.availability
        await product.save()

        res.json({data: product})

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {

    try {
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product){
            res.status(404).json({error:'Producto no encontrado'})
            return
        }

        await product.destroy()
        res.json({data: 'Producto Eliminado'})

    } catch (error) {
        console.log(error)
        next(error)
    }
}
