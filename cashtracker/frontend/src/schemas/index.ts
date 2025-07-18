import { error } from 'console'
import { z } from 'zod'

export const RegisterSchema = z.object({
    email: z.string().min(1, { message: 'El email es obligatorio' }).email({ message: 'El email no es valido' }),
    name: z.string().min(1, { message: 'Tu nombre no puede ir vacio' }),
    password: z.string().min(8, { message: 'El password es muy corto, minimo ocho caracteres' }),
    password_confirmation: z.string()
}).refine((value) => value.password_confirmation === value.password, {
    message: 'Los passwords no son iguales',
    path: ['password_confirmation']
})

export const SuccessSchema = z.string()

export const ErrorResponseSchema = z.object({
    error: z.string()
})

export const TokenSchema = z.string({ message: 'Token no valido' }).min(6, { message: 'Token no valido' }).max(6, { message: 'Token no valido' })

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

export const ExpenseAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    budgetId: z.number()
})

export const BudgetAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    expenses: z.array(ExpenseAPIResponseSchema)
})

export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema.omit({expenses:true}))
export type Expense = z.infer<typeof ExpenseAPIResponseSchema>

export type User = z.infer<typeof UserSchema>

export const ForgotPasswordSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email no válido' }),
})

export const ResetPasswordSchema = z.object({
    password: z.string().min(8, { message: 'El password debe de ser al menos ocho caracteres' }),
    password_confirmation: z.string()
}).refine(value => value.password === value.password_confirmation, {
    message: 'Los password no son iguales',
    path: ['password_confirmation']
})

export const DraftBudgetSchema = z.object({
    name: z.string()
        .min(1, { message: 'El Nombre del presupuesto es obligatorio' }),
    amount: z.coerce.
        number({ message: 'Cantidad no válida' })
        .min(1, { message: 'Cantidad no válida' }),
})

export const PasswordValidationSchema = z.string().min(1, { message: 'Password no válido' })




export type Budget = z.infer<typeof BudgetAPIResponseSchema>


export const DraftExpenseSchema = z.object({
    name: z.string().min(1, { message: 'El nombre del gasto es obligatorio' }),
    amount: z.coerce.number().min(1, { message: 'Cantidad no valida' })
})

export type DraftExepense = z.infer<typeof DraftExpenseSchema>