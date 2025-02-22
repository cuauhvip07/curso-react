import { z } from 'zod'

export const registerSchema = z.object({
    email: z.string()
        .min(1, { message: 'El email es obligatorio' })
        .email({ message: 'El email no es valido' }),
    name: z.string()
        .min(1, { message: 'Tu nombre no puede ir vacio' }),
    password: z.string()
        .min(8, { message: 'El password es muy corto, minimo 8 caracteres' }),
    password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no son iguales',
    path: ['password_confirmation']
})

export const SuccessSchema = z.string()
export const ErrorResponseSchema = z.object({
    error:z.string()
})

export const TokenSchema = z.string({message:'Token no valido'})
                            .length(6,{message:'Token no valido'})
                            