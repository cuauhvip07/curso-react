"use server"

import { ResetPasswordSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function resetPassword(token:string,prevState : ActionStateType, formData: FormData) {

    
    const resetPasswordInput = {
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput)
    if(!resetPassword.success){
        
        return {
            errors: resetPassword.error.errors.map(error => error.message),
            success:''
        }

    }

    return {
        errors:[],
        success:''
    }
}