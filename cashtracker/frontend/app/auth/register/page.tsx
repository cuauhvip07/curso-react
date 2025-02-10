import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm"


export const metadata: Metadata = {
  title: "CashTracker - Crear cuenta",
  description: "CashTracker - Crear cuenta"
}

export default function RegisterPage() {

  console.log('Register pagw')

  return (
    <div>
      <>
        <h1 className=" font-black text-6xl text-purple-950">Crea una cuenta</h1>
        <p className="text-3xl font-bold">y controla tus <span className=" text-amber-500">finanzas</span></p>

        <RegisterForm />
      </>
    </div>
  )
}
