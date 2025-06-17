"use client"
import { authenticate } from "@/actions/authenticate-user-action"
import { useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify"
import ErrorMessage from "../iu/ErrorMessage"

export default function LoginForm() {

    const [showMessages, setShowMessages] = useState(false)

    const [state, formAction, pending] = useActionState(authenticate, {
        errors: []
    })

    useEffect(() => {
        if (state.errors.length === 0) return;

        const timeout = setTimeout(() => {
            setShowMessages(false);
        }, 5000);

        setShowMessages(true);

        if (state.errors.length > 0) {
            state.errors.forEach(error => {
                toast.error(error, { draggable: true });
            });
        }


        return () => clearTimeout(timeout);
    }, [state.errors]);

    return (
        <>

            {showMessages && (
                <>
                    {state.errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                </>
            )}

            <form
                action={formAction}
                className="mt-14 space-y-5"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
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
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="password"
                        autoComplete="current-password"
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
        </>
    )
}