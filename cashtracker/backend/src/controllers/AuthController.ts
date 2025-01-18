import { Request,Response } from "express"
import User from "../models/User"
import { hashPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"


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

}