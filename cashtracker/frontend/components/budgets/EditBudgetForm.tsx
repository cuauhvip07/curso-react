"use client"

import { Budget } from "@/src/schemas";
import BudgetForm from "./BudgetForm";

export default function EditBudgetForm({budget} : {budget:Budget}) {
    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            // action={formAction}
        >

            {/* {
                showMessages && (
                    <>
                        {state.errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                    </>
                )
            } */}

            <BudgetForm 
                budget={budget}
            />

            {/* <button
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                // disabled={pending}
            >
                {pending ? (
                    <div className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Cargando...
                    </div>
                ) : (
                    "Crear"
                )}
            </button> */}

            <button type="submit">hola</button>
        </form>
    )
}
