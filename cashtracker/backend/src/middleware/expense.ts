import { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"

export const validateExpenseInput = async (req: Request, res:Response, next: NextFunction) => {

    await body('name')
        .notEmpty().withMessage('El campo no puede ir vacio')
    .run(req)

    await body('amount')
        .notEmpty().withMessage('El monto no puede ir vacio')
        .isNumeric().withMessage('La cantidad debe de ser un numero')
        .custom(value => value > 0).withMessage('La cantidad debe ser mayor a cero')
    .run(req)

    next()

}

export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
    await param('expenseId')
        .isInt().custom(value => value > 0).withMessage('ID no valido')
    .run(req)

    
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors : errors.array()})
        return
    }

    next()

}