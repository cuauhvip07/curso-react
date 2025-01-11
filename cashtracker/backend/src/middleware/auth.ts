import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";


export const validateCreateAccount = async (req: Request, Response: Response, next: NextFunction) => {

    await body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio')
    .run(req)

    await body('password')
        .isLength({min:8}).withMessage('El password es muy corto, mínimo 8 caracteres')
    .run(req)

    await body('email')
        .isEmail().withMessage('Email no valido')
    .run(req)


    next()
}