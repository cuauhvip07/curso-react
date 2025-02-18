"use server"

import { ErrorResponseSchema, registerSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

// formData -> Recupera los datos del formulario
export async function register(prevState: ActionStateType,formData : FormData){

    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation'),
    }

    // Validar

    const register = registerSchema.safeParse(registerData)
    
    // console.log(register)
    
    if(!register.success){
        const errors = register.error.errors.map(error => error.message) // Obetener los errores
        return{
            errors,
            success: ''
        }
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

    const json = await req.json() // Retorna el mensaje del back 

    // Error en caso de duplicidad de cuentas
    if(req.status === 409){
        const error = ErrorResponseSchema.parse(json)
        return{
            success: prevState.success,
            errors:[error.error] // En array por que nos regresa ub objeto y estamos iterando los arreglos
        }
    }

    
    const success = SuccessSchema.parse(json)


    return {
        errors:[],
        success : success 
    }
}