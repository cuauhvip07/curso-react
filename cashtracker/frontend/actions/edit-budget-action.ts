"use server"

import getToken from "@/src/auth/token"
import { Budget, DraftBudgetSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath, revalidateTag } from "next/cache"

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

    const token = await getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}`

    const req = await fetch(url,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount:budget.data.amount
        })
    })

    const json = await req.json()
    
    if(!req.ok){
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors:[errors.error],
            success:''
        }
    }

    const success = SuccessSchema.parse(json)

    // Revalida toda la url con todas las peticiones que hay 
    
    // revalidatePath('/admin')


    // Cuando mandamos al usurio a otra pagina y esa pagina trae mucha informacion de la bd, esta funcion hace que solo actualice los datos que actualizamos, pero se pone en el fetch (ej En el app->admin -> page)
    revalidateTag('/all-budgets')
    return {
        errors:[],
        success
    }

}