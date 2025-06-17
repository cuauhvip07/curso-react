"use server"

import { ForgotPasswordSchema } from "@/src/schemas"
import { success } from "zod/v4"

type ActionStateType = {
    errors:string[],
    success:string
}

export async function forgotPassword(prevState:ActionStateType, formData:FormData){
    
    const forgotPassword = ForgotPasswordSchema.safeParse({
        email: formData.get('email')
    })

    if(!forgotPassword.success){
        return{
            errors:forgotPassword.error.errors.map(error => error.message),
            success:''
        }
    }


    return{
        errors:[],
        success:''
    }
}