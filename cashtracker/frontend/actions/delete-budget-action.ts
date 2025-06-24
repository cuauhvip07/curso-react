"use server"

import { Budget } from "@/src/schemas"

type ActionStateType = {
    errors:string[]
}

export async function deleteBudget (budgetId:Budget['id'], prevState:ActionStateType, formData:FormData) {
    console.log(budgetId)

    return {
        errors:[]
    }
}