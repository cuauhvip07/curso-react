"use server"

import { Budget } from "@/src/schemas"

type ActionStateType = {
    errors:string[],
    success: string
}

export async function editBudget(budgetId:Budget['id'], prevState: ActionStateType, formData:FormData){

    console.log(budgetId)


    return {
        errors:[],
        success:''
    }

}