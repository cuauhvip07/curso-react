import { Request,Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"
import { generateJWT } from "../utils/jwt"


export class AuthController {
    
    
    static createAccount = async (req: Request,res: Response) =>{
        const {email, password} = req.body

        // Prevenir duplicados
        const userExists = await User.findOne({where: {email: email}}) // Se pone el nombre de la columna

        if(userExists){
            const error = new Error('El email ya esta registrado')
            res.status(409).json({error:error.message})
            return
        }

        try {
            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.token = generateToken()
            await user.save()

            await AuthEmail.sendConfirmationEmail({
                name: user.dataValues.name,
                email: user.dataValues.email,
                token: user.dataValues.token
            })

            res.json('Cuenta creada correctamente')
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
    }   

    static confirmAccount = async(req: Request, res:Response) => {
        const {token} = req.body
        
        const user = await User.findOne({where:{token:token}})
        if(!user){
            const error = new Error('Token no valido')
            res.status(401).json({error:error.message})
            return
        }
        user.confirmed = true
        user.token = null
        await user.save()
        res.json("Cuenta confirmada correctamente")
    }

    static login = async (req:Request,res:Response) => {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            const error = new Error('Usuario no encontrado')
            res.status(404).json({error:error.message})
            return
        }

        if(!user.confirmed){
            const error = new Error('La cuenta no ha sido confirmada')
            res.status(403).json({error:error.message})
            return
        }

        const isPasswordCorrect = await checkPassword(password,user.password)
        
        if(!isPasswordCorrect){
            const error = new Error('Contraseña incorrecta')
            res.status(401).json({error:error.message})
            return
        }

        // Se usa la funcion de utils para poder generar el token
        const token = generateJWT(user.id)


        res.json(token)
    }

    static forgotPassword = async (req:Request,res:Response) => {
        const {email} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            const error = new Error('Usuario no encontrado')
            res.status(404).json({error:error.message})
            return
        }
        user.token = generateToken()
        await user.save()

        await AuthEmail.sendPasswordResetToken({
            name: user.dataValues.name,
            email: user.dataValues.email,
            token: user.dataValues.token
        })

        res.json('Revisa tu email para instrucciones')

    }

    static validateToken = async (req:Request,res:Response) => {
        const {token} = req.body

        const tokenExists = await User.findOne({where:{token}})
        if(!tokenExists){
            const error = new Error('Token no valido')
            res.status(404).json({error:error.message})
            return
        }

        res.json('Token valido')
    }

}