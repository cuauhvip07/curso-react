import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";



export const metadata: Metadata = {
    title: "CashTracker - Iniciar Sesión",
    description: "CashTracker - Iniciar Sesión"
}

export default function ForgotPassword() {

    return (
        <div>
            <>
                <h1 className=" font-black text-6xl text-purple-950">¿Olvidaste tu contraseña?</h1>
                <p className="text-3xl font-bold">aqui puedes <span className=" text-amber-500">reestablecerla</span></p>

                <ForgotPasswordForm/>


            </>
        </div>
    )
}
