"use client"

import { createBudget } from "@/actions/create-budget-action"
import { useActionState, useEffect, useState } from "react"
import ErrorMessage from "../iu/ErrorMessage"

export default function CreateBudgetForm() {

    const [state, formAction, pending] = useActionState(createBudget, {
        errors: [],
        success: ''
    })

    const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        if (state.errors.length > 0) {
            setShowMessage(true)
            const timeout = setTimeout(() => {
                setShowMessage(false)
            }, 5000)

            return () => clearTimeout(timeout)
        }


    }, [state.errors])

    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={formAction}
        >

            {
                showMessage &&
                state.errors.map((error,i) => <ErrorMessage key={i}>{error}</ErrorMessage>)
            }

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
            <button
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                disabled={pending}
            >
                {pending ? (
                    <div className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Cargando...
                    </div>
                ) : (
                    "Crear"
                )}
            </button>
        </form>
    )
}





