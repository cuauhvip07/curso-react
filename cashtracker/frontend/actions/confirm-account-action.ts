"use server"

type ActionStateType = {
    errors: string[]
}
// Se cambia de orden los parametros por que se ocupo .bind

export async function confirmAccount(token:string, prevState:ActionStateType) {
    
    console.log('Desde confirm account')
    console.log(token)

    return{
        errors:[]
    }
}