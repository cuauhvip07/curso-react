"use client"

import { forgotPassword } from "@/actions/forgot-password-action"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function ForgotPasswordForm() {

    const [state , formAction]  = useActionState(forgotPassword,{
        errors:[],
        success:''
    })

    useEffect(() => {
        if(state.errors){
            state.errors.forEach(error => {
                toast.error(error)
            })
        }

        if(state.success){
            toast.success(state.success)
        }
    },[state])

    return (
        <form
            className=" mt-14 space-y-5"
            noValidate
            action={formAction}
        >
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

            <input
                type="submit"
                value='Enviar Instrucciones'
                className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer "
            />
        </form>
    )
}