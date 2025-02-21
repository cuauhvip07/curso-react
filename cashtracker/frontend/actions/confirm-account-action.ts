"use server"

type ActionStateType = {
    errors: string[]
}

export async function confirmAccount(prevState:ActionStateType) {
    console.log('Desde confirm account')


    return{
        errors:[]
    }
}