"use server"

import { ErrorResponseSchema, ResetPasswordSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors:string[],
    success:string
}

export async function resetPassword(token:string,prevState:ActionStateType, formData:FormData){
    
    const resetPasswordInput = {
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput)

    if(!resetPassword.success){

        return{
            errors: resetPassword.error.errors.map(error => error.message),
            success:''
        }
    }

    const url = `${process.env.API_URL}/auth/reset-password/${token}`
    const req = await fetch(url , {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            password:resetPassword.data.password
        })
    })

    const json = await req.json()
    
    if(!req.ok){

        const error = ErrorResponseSchema.parse(json)
        return {
            errors:[error.error],
            success:''
        }
    }

    const success = SuccessSchema.parse(json)

    return {
        errors:[],
        success
    }
}