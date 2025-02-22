"use server"

import { LoginSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
}

export async function authenticate(prevState: ActionStateType,formData:FormData){
    
    const loginCredential = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const auth = LoginSchema.safeParse(loginCredential)

    if(!auth.success){
        return{
            errors: auth.error.errors.map(error => error.message)
        }
    }

    return {
        errors:[]
    }
}