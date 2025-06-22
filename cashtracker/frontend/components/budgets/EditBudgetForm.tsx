"use client"

import { Budget } from "@/src/schemas";
import BudgetForm from "./BudgetForm";
import { useActionState, useEffect, useState } from "react";
import { editBudget } from "@/actions/edit-budget-action";
import ErrorMessage from "../iu/ErrorMessage";
import SuccessMessage from "../iu/SuccessMessage";

export default function EditBudgetForm({budget} : {budget:Budget}) {


    const editBudgetWithId = editBudget.bind(null,budget.id)
    const [state,formAction,pending] = useActionState(editBudgetWithId,{
        errors:[],
        success:''
    })
    const [showMessages,setShowMessages] = useState(false)

    useEffect(() => {
        if(state.errors.length === 0 && !state.success) return

            setShowMessages(true)
            const time = setTimeout(() => {
                setShowMessages(false)    
            },5000)
        
    },[state])

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

                        {state.success && (
                            <>
                                <SuccessMessage>{state.success}</SuccessMessage>
                            </>
                        )}

                    </>
                )
            }

            <BudgetForm 
                budget={budget}
            />

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
                    "Guardar Cambios"
                )}
            </button>
        </form>
    )
}
