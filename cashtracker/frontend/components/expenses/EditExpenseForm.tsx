import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useActionState, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DraftExepense } from "@/src/schemas";
import editExpense from "@/actions/edit-expense-action";
import { toast } from "react-toastify";
import ErrorMessage from "../iu/ErrorMessage";

export default function EditExpenseForm({ closeModal }: { closeModal: () => void }) {

  const [expense, setExpense] = useState<DraftExepense>()
  const [showMessages, setShowMessages] = useState(false)
  const params = useParams()
  const searchParams = useSearchParams()

  const { id: budgetId } = params
  const budgetWithNumber = +budgetId!
  const expenseId = +searchParams.get('editExpenseId')!

  const editExpenseWithBudgetId = editExpense.bind(null, { expenseId, budgetId: budgetWithNumber })
  const [state, formAction, isLoading] = useActionState(editExpenseWithBudgetId, {
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


  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`
    fetch(url)
      .then(res => res.json())
      .then(data => setExpense(data))
  }, [])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Editar Gasto {expense?.name}
      </DialogTitle>
      <p className="text-xl font-bold">Edita los detalles de un {''}
        <span className="text-amber-500">gasto</span>
      </p>
      {showMessages &&
        (
          state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)
        )
      }
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        action={formAction}
        noValidate
      >

        <ExpenseForm
          expense={expense}
        />

        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Guardar Cambios'
        />
      </form>
    </>
  )
}