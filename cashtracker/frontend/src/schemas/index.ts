import { z } from 'zod'

export const RegisterSchema = z.object({
    email: z.string().min(1,{message:'El email es obligatorio'}).email({message:'El email no es valido'}),
    name: z.string().min(1,{message:'Tu nombre no puede ir vacio'}),
    password: z.string().min(8,{message:'El password es muy corto, minimo ocho caracteres'}),
    password_confirmation: z.string()
}).refine(value => value.email === value.email,{
    message:'Los passwords no son iguales',
    path:['password_confirmation']
})