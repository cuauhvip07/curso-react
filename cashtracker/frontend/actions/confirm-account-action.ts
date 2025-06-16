"use server"

type ActionStateType = {
    errors:string[]
}

export async function confirmAccount(prevState:ActionStateType){

    return{
        errors:[]
    }
}