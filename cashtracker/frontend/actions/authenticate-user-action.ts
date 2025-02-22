"use server"

import { LoginSchema } from "@/src/schemas"

export async function authenticate(prevState: any,formData:FormData){
    
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
}