import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "CashTracker - Iniciar Sesión",
  description: "CashTracker - Iniciar Sesión"
}

export default function LoginPage() {

  return (
    <div>
      <>
        <h1 className=" font-black text-6xl text-purple-950">Inicia Sesión</h1>
        <p className="text-3xl font-bold">y controla tus <span className=" text-amber-500">finanzas</span></p>

        <LoginForm/>

      </>
    </div>
  )
}
