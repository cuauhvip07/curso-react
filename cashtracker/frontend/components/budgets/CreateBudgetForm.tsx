"use client"

import { createBudget } from "@/actions/create-budget-action"
import { useActionState, useEffect, useState } from "react"
import ErrorMessage from "../iu/ErrorMessage"
import SuccessMessage from "../iu/SuccessMessage"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import BudgetForm from "./BudgetForm"

export default function CreateBudgetForm() {

    const router = useRouter()

    const [state, formAction, pending] = useActionState(createBudget, {
        errors: [],
        success: ''
    })

    const [showMessages, setShowMessages] = useState(false)

    useEffect(() => {
        if (state.errors.length === 0 && !state.success) return;

        const timeout = setTimeout(() => {
            setShowMessages(false);
            router.push('/admin')
        }, 5000);

        setShowMessages(true);

        if (state.success) {
            toast.success(state.success, { draggable: true })
        }

        return () => clearTimeout(timeout);
    }, [state])

    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={formAction}
        >

            {
                showMessages && (
                    <>
                        {state.errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                    </>
                )
            }

            <BudgetForm/>

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





