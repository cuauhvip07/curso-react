"use client"

import { register } from "@/actions/create-account-action"
import { useActionState, useEffect, useState } from "react"
import ErrorMessage from "../iu/ErrorMessage"
import SuccessMessage from "../iu/SuccessMessage"



export default function RegisterForm() {

    const [state, formAction, pending] = useActionState(register, {
        errors: [],
        success: ''
    })

    const [showMessages, setShowMessages] = useState(false)

    useEffect(() => {
        if (state.errors.length > 0 || state.success) {
            setShowMessages(true)
            const timeout = setTimeout(() => {
                setShowMessages(false)
            }, 5000)

            return () => clearTimeout(timeout)
        }
    }, [state.errors, state.success])

    return (
        <form
            className="mt-14 space-y-5"
            noValidate
            action={formAction}
        >

            {
                showMessages && (
                    <>
                        {state.errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}

                        {state.success && (
                            <SuccessMessage>{state.success}</SuccessMessage>
                        )}
                    </>
                )
            }

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                    autoComplete="email"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >Nombre</label>
                <input
                    type="name"
                    placeholder="Nombre de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="name"
                    autoComplete="name"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >Password</label>
                <input
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password"
                    autoComplete="new-password"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >Repetir Password</label>
                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite Password de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password_confirmation"
                    autoComplete="new-password"
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
                    "Registrarme"
                )}
            </button>
        </form>
    )
}
