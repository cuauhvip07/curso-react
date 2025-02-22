"use server"

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas"


type ActionStateType = {
    errors: string[],
    success: string
}
// Se cambia de orden los parametros por que se ocupo .bind

export async function confirmAccount(token:string, prevState:ActionStateType) {

    const confirmToken = TokenSchema.safeParse(token)
    if(!confirmToken.success){
        return{
            errors: confirmToken.error.errors.map(error => error.message),
            success:''
        }
    }

    const url = `${process.env.API_URL}/auth/confirm-acount`

    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            token:confirmToken.data
        })
    })

    const json = await req.json()

    if(!req.ok){

        const {error} = ErrorResponseSchema.parse(json)

        return{
            errors:[error],
            success:''
        }
    }

    const success = SuccessSchema.parse(json)
    return{
        errors:[],
        success
    }
}