"use client"

import { createBudget } from "@/actions/create-budget-action"
import { useActionState, useEffect } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function CreateBudgetForm() {

    const router = useRouter()
    const [state, formAction] = useActionState(createBudget, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.success){
            toast.success(state.success,{
                onClose: () => {
                    router.push('/admin')
                },
                onClick: () => {
                    router.push('/admin')
                }
            })
        }
    },[state])

    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={formAction}
        >
            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
            <div className="space-y-3">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Nombre Presupuesto
                </label>
                <input
                    id="name"
                    className="w-full p-3  border border-gray-100 bg-slate-100"
                    type="text"
                    placeholder="Nombre del Presupuesto"
                    name="name"
                />
            </div>
            <div className="space-y-3">
                <label htmlFor="amount" className="text-sm uppercase font-bold">
                    Cantidad Presupuesto
                </label>
                <input
                    type="number"
                    id="amount"
                    className="w-full p-3  border border-gray-100 bg-slate-100"
                    placeholder="Cantidad Presupuesto"
                    name="amount"
                />
            </div>
            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value='Crear Presupuesto'
            />
        </form>
    )
}