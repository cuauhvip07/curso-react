"use server"

import { ForgotPasswordSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function forgotPassword(preAction:ActionStateType, formData: FormData) {
    
    const forgotPassword = ForgotPasswordSchema.safeParse({
        email:formData.get('email')
    })

    if(!forgotPassword.success){
        return {
            errors: forgotPassword.error.errors.map(error => error.message),
            success:''
        }
    }



    return {
        errors:[],
        success:''
    }
}