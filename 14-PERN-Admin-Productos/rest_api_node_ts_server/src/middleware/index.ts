
import { Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'

// 14. Un middle ware siempre debe tener un req,res,next, aqui vienen las reglas de validacion
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {


    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    next() // Sirve para que no se quede procesando la solicitud y pase a otra funcion o middleware
}