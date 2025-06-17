import { error } from 'console'
import { z } from 'zod'

export const RegisterSchema = z.object({
    email: z.string().min(1,{message:'El email es obligatorio'}).email({message:'El email no es valido'}),
    name: z.string().min(1,{message:'Tu nombre no puede ir vacio'}),
    password: z.string().min(8,{message:'El password es muy corto, minimo ocho caracteres'}),
    password_confirmation: z.string()
}).refine((value) => value.password_confirmation === value.password,{
    message:'Los passwords no son iguales',
    path:['password_confirmation']
})

export const SuccessSchema = z.string()

export const ErrorResponseSchema = z.object({
    error:z.string()
})

export const TokenSchema = z.string({message:'Token no valido'}).min(6,{message:'Token no valido'}).max(6,{message:'Token no valido'})

export const LoginSchema = z.object({
        email: z.string()
                .min(1, {message: 'El Email es Obligatorio'})
                .email( {message: 'Email no válido'}),
        password: z.string()
                .min(1, {message: 'El Password no puede ir vacio'})
})

export const UserSchema = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email()
})

export type User = z.infer<typeof UserSchema>