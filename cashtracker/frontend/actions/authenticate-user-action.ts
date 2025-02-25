"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ErrorResponseSchema, LoginSchema } from "@/src/schemas"

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

    const url = `${process.env.API_URL}/auth/login`

    const req = await fetch(url,{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            password: auth.data.password,
            email:auth.data.email
        })
    })

    const json = await req.json()

    if(!req.ok){
        const {error} = ErrorResponseSchema.parse(json)
        
        return{
            errors: [error]
        }
    }

    // Setear cookies

    (await cookies()).set({
        name:'CASHTRACKER_TOKEN',
        value: json,
        httpOnly: true,
        path:'/'
    })

    redirect('/admin') // Redireccioanr -> Sol sirve en un useServer
}