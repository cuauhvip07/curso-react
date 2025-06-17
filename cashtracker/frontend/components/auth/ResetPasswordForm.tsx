import { resetPassword } from "@/actions/reset-password-action"
import { useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify";
import ErrorMessage from "../iu/ErrorMessage";
import SuccessMessage from "../iu/SuccessMessage";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token }: { token: string }) {

    const router = useRouter()

    const [showMessages, setShowMessages] = useState(false)

    const resetPasswordWithToken = resetPassword.bind(null, token)
    const [state, formAction, pending] = useActionState(resetPasswordWithToken, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.errors.length === 0 && !state.success) return;

        const timeout = setTimeout(() => {
            setShowMessages(false);
            router.push('/auth/login')
        }, 5000);

        setShowMessages(true);


        if (state.success) {
            toast.success(state.success, {
                draggable: true,
                autoClose: 4000,
            });
        }

        return () => clearTimeout(timeout);
    }, [state.errors, state.success]);

    return (
        <form
            className=" mt-14 space-y-5"
            noValidate
            action={formAction}
        >

            {
                showMessages && (
                    <>
                        {state.errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}

                        {
                            state.success && (
                                <SuccessMessage>{state.success}</SuccessMessage>
                            )
                        }
                    </>
                )

            }
            <div className="flex flex-col gap-5">
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

            <div className="flex flex-col gap-5">
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
                        Validando...
                    </div>
                ) : (
                    "Actualizar"
                )}
            </button>
        </form>
    )
}