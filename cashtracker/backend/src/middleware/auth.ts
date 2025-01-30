import { body, param } from "express-validator";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import User from "../models/User";

declare global{
    namespace Express {
        interface Request{
            user?: User
        }
    }
}


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

export const validateToken = async (req:Request, res:Response, next: NextFunction) => {

    await body('token')
        .notEmpty().isLength({min:6, max:6}).withMessage('Token no valido')
    .run(req)

    next()
}

export const validateInputs =  async (req:Request,res:Response,next:NextFunction) => {
    await body('email')
        .isEmail().withMessage('Email no valido')
    .run(req)

    await body('password')
        .notEmpty().withMessage('El password es obligatorio')
    .run(req)

    next()

}

export const validateEmail = async (req:Request, res:Response, next:NextFunction) => {

    await body('email')
        .isEmail().withMessage('Email no valido')
    .run(req)

    next()

}

export const validateTokenParam =  async (req:Request, res:Response, next:NextFunction) => {
    
    await param('token')
        .notEmpty().isLength({min:6, max:6}).withMessage('Token no valido')
    .run(req)

    next()
}

export const validatePassword = async (req:Request, res:Response, next:NextFunction) => {

    await body('password')
        .isLength({min:8}).withMessage('El password es muy corto, mínimo 8 caracteres')
        .notEmpty().withMessage('El password no puede ir vacio')
    .run(req)

    next()

}

export const authenticate = async (req:Request,res:Response,next:NextFunction) => {

    const bearer = req.headers.authorization

    if(!bearer){
        const error = new Error('No autorizado')
        res.status(401).json({error:error.message})
        return
    }

    const [,token] = bearer.split(' ')
    if(!token){
        const error = new Error('Token no valido')
        res.status(401).json({error:error.message})
        return
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(typeof decoded === 'object' && decoded.id){ // No nos de error TS en decoded.id 
            req.user = await User.findByPk(decoded.id,{
                attributes:['id','name','email']    // Solo nos traega esos atributos
            })
            next()
        }
        
    } catch (error) {
        res.status(500).json({error:'Token no valido'})
    }

    


} 