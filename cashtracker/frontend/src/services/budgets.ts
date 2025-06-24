
import getToken from "@/src/auth/token"
import { BudgetAPIResponseSchema } from "@/src/schemas"
import { cache } from 'react'
import { notFound } from "next/navigation"

export const getBudgetById = cache(async (budgetId: string) => {

    const url = `${process.env.API_URL}/budgets/${budgetId}`

    const token = await getToken()

    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await req.json()

    if (!req.ok) {
        notFound()
    }

    const budget = BudgetAPIResponseSchema.parse(json)

    return budget

})