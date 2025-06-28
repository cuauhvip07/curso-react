import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useActionState, useEffect, useState } from "react";
import createExpense from "@/actions/create-expense-action";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { error } from "console";
import ErrorMessage from "../iu/ErrorMessage";

export default function AddExpenseForm({closeModal} : {closeModal: () => void}) {

    const { id } = useParams() // Solo en client components
    const [showMessages, setShowMessages] = useState(false)


    const createExpenseWithBudgetId = createExpense.bind(null, +id!)
    const [state, formAction, pending] = useActionState(createExpenseWithBudgetId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.errors.length === 0 && !state.success) return;

        const timeout = setTimeout(() => {
            setShowMessages(false);
        }, 5000);

        setShowMessages(true);

        if (state.success) {
            toast.success(state.success, { draggable: true })
            closeModal()
        }

        return () => clearTimeout(timeout);
    }, [state])

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Agregar Gasto
            </DialogTitle>

            <p className="text-xl font-bold">Llena el formulario y crea un {''}
                <span className="text-amber-500">gasto</span>
            </p>

            {showMessages && (
                <>
                    {state.errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                </>
            )}

            <form
                className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
                noValidate
                action={formAction}
            >
                <ExpenseForm />
                <button
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    disabled={pending}
                >
                    {pending ? (
                        <div className="flex items-center justify-center gap-2">
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Creando...
                        </div>
                    ) : (
                        "Crear"
                    )}
                </button>
            </form>
        </>
    )
}



