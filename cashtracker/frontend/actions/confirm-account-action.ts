"use server"

import { TokenSchema } from "@/src/schemas"

type ActionStateType = {
    errors:string[],
    success:string
}

export async function confirmAccount(token:string,prevState:ActionStateType){
    const confirmToken = TokenSchema.safeParse(token)

    if(!confirmToken.success){
        return{
            errors: confirmToken.error.errors.map(error => error.message),
            success:''
        }
    }

    console.log(confirmToken.data)

    return{
        errors:[],
        success:''
    }
}