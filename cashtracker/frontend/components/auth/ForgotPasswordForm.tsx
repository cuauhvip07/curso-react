"use client"

import { forgotPassword } from "@/actions/forgot-password-action"
import { useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify"
import ErrorMessage from "../iu/ErrorMessage"
import SuccessMessage from "../iu/SuccessMessage"

export default function ForgotPasswordForm() {

    const [showMessages, setShowMessages] = useState(false)

    const [state, formAction, pending] = useActionState(forgotPassword, {
        errors: [],
        success: ''
    })

    console.log(state)


    useEffect(() => {
        if (state.errors.length === 0 && !state.success) return;

        const timeout = setTimeout(() => {
            setShowMessages(false);
        }, 5000);

        setShowMessages(true);

        if(state.success){
            toast.success(state.success,{draggable:true})
        }

        if (state.errors.length > 0) {
            state.errors.forEach(error => {
                toast.error(error, { draggable: true });
            });
        }


        return () => clearTimeout(timeout);
    }, [state.success, state.errors]);


    return (
        <form
            className=" mt-14 space-y-5"
            noValidate
            action={formAction}
        >

           <>
            {
                showMessages && (
                    <>
                        {state.errors.map((error,i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}

                        {
                            state.success &&(
                                <SuccessMessage>{state.success}</SuccessMessage>
                            )
                        }

                    </>
                )
            }
           </>

            <div className="flex flex-col gap-2 mb-10">
                <label
                    className="font-bold text-2xl"
                >Email</label>

                <input
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                />
            </div>

            <button
                type="submit"
                className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
                disabled={pending}
            >
                {pending ? (
                    <div className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Cargando...
                    </div>
                ) : (
                    "Enviar"
                )}
            </button>
        </form>
    )
}