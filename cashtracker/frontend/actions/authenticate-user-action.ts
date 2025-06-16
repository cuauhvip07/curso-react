"use server"

import { LoginSchema } from "@/src/schemas"

type ActionStateType = {
    errors:string []
}

export async function authenticate(prevstate:ActionStateType, formData:FormData){

    const loginCredentials = {
        email:formData.get('email'),
        password:formData.get('password')
    }

    const auth = LoginSchema.safeParse(loginCredentials)

    if(!auth.success){

        return{
            errors:auth.error.errors.map(error => error.message)
        }
    }

    return {
        errors:[]
    }

}