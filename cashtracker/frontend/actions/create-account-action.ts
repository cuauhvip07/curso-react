"use server"

import { RegisterSchema } from "@/src/schemas"

export async function register(formData: FormData){
    
    const registerData = {
        email:formData.get('email'),
        name:formData.get('name'),
        password:formData.get('password'),
        password_confirmation:formData.get('password_confirmation')
    }

    // Validar

    const register = RegisterSchema.safeParse(registerData)
    
    const errors = register.error?.errors.map(error => error.message)

    console.log(errors)
    console.log(register)

    // Registar 
    const url = `${process.env.API_URL}/auth/create-account`

}