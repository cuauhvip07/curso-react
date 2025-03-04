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
    error: z.string()
})

export const TokenSchema = z.string({ message: 'Token no valido' })
                            .length(6, { message: 'Token no valido' })


export const LoginSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email no válido' }),
    password: z.string()
        .min(1, { message: 'El Password no puede ir vacio' })
})

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})

export type User = z.infer<typeof UserSchema>


export const ForgotPasswordSchema = z.object({
    email: z.string()   
            .min(1, {message: 'El Email es Obligatorio'})
            .email( {message: 'Email no válido'}),
})

export const ResetPasswordSchema = z.object({
    password: z.string()
            .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"]
});

export const DraftBudgetSchema = z.object({
    name: z.string()
            .min(1, {message: 'El Nombre del presupuesto es obligatorio'}),
    amount: z.coerce. // Convierte un string a un numero
            number({message: 'Cantidad no válida'})
            .min(1, {message: 'Cantidad no válida'}),
})

export const BudgetAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
})

// Cuando el objeto viene de un array
export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema)