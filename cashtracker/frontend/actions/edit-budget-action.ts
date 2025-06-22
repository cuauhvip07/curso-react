"use server"

import { Budget, DraftBudgetSchema } from "@/src/schemas"

type ActionStateType = {
    errors:string[],
    success: string
}

export async function editBudget(budgetId:Budget['id'], prevState: ActionStateType, formData:FormData){

    const budgetData = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    const budget = DraftBudgetSchema.safeParse(budgetData)

    if(!budget.success){

        return {
            errors:budget.error.errors.map(errors => errors.message),
            success:''
        }
    }


    return {
        errors:[],
        success:''
    }

}