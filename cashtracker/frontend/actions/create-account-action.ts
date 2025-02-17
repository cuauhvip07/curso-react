"use server"

import { registerSchema } from "@/src/schemas"
import { error } from "console"

// formData -> Recupera los datos del formulario
export async function register(formData : FormData){

    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation'),
    }

    // Validar

    const register = registerSchema.safeParse(registerData)
    
    // console.log(register)
    const errors = register.error?.errors.map(error => error.message) // Obetener los errores
    if(!register.success){
        return
    }

    // Registrar el usuario
    const url = `${process.env.API_URL}/auth/create-account`
    
    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            // Se pone data ya que zod te da un data
            name: register.data.name, 
            password: register.data.password,
            email: register.data.email
        })
    })

    const json = await req.json()
    console.log(json)

}