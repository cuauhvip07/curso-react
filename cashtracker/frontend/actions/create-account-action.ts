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
    console.log(errors)

    console.log(register)

    // Registrar el usuario

}