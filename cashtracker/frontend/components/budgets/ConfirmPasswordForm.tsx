"use client"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { DialogTitle } from "@headlessui/react"
import { useActionState, useEffect, useState } from "react"
import { deleteBudget } from "@/actions/delete-budget-action"
import ErrorMessage from "../iu/ErrorMessage"
import { toast } from "react-toastify"

export default function ConfirmPasswordForm() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const [showMessage, setShowMessage] = useState(false)

    const budgetId = +searchParams.get('deleteBudgetId')!

    const closeModal = () => {
        const hideModal = new URLSearchParams(searchParams.toString())
        hideModal.delete('deleteBudgetId')
        router.replace(`${pathname}?${hideModal}`)
    }

    const deleteBudgetWithPassword = deleteBudget.bind(null, budgetId)
    const [state, formAction, pending] = useActionState(deleteBudgetWithPassword, {
        errors: [],
        success:''
    })

    useEffect(() => {
        if (state.errors.length === 0 && !state.success) return

        setShowMessage(true)

        const timeOut = setTimeout(() => {
            setShowMessage(false)
        }, 3000)

        if(state.success){
            toast.success(state.success,{draggable:true})
            closeModal()
        }

        return () => clearTimeout(timeOut)

        

    }, [state])

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Eliminar Presupuesto
            </DialogTitle>
            <p className="text-xl font-bold">Ingresa tu Password para {''}
                <span className="text-amber-500">eliminar el presupuesto {''}</span>
            </p>
            <p className='text-gray-600 text-sm'>(Un presupuesto eliminado y sus gastos no se pueden recuperar)</p>

            <>
                {showMessage &&
                    state.errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)
                }

            </>

            <form
                className=" mt-14 space-y-5"
                noValidate
                action={formAction}
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="password"
                    >Ingresa tu Password para eliminar</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name='password'
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <button
                        type="submit"
                        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer block"
                        disabled={pending}
                    >
                        {pending ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Validando...
                            </div>
                        ) : (
                            "Eliminar Presupuesto"
                        )}
                    </button>

                    <button
                        className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
                        onClick={closeModal}
                    >Cancelar</button>
                </div>
            </form>

        </>
    )
}