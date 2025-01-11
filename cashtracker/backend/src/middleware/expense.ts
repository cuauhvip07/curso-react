import { Request, Response, NextFunction } from "express"
import { body } from "express-validator"

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