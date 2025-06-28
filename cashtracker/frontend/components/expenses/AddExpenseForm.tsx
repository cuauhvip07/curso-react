import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useActionState } from "react";
import createExpense from "@/actions/create-expense-action";
import { useParams } from "next/navigation";

export default function AddExpenseForm() {

    const {id} = useParams() // Solo en client components


    const createExpenseWithBudgetId = createExpense.bind(null,+id!)
    const [state,formAction,pending] = useActionState(createExpenseWithBudgetId,{
        errors:[],
        success:''
    })

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
            <form
                className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
                noValidate
                action={formAction}
            >
                <ExpenseForm />
                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    value='Registrar Gasto'
                />
            </form>
        </>
    )
}