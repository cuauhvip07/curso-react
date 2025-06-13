import type {Metadata} from 'next'
import RegisterForm from "@/components/auth/RegisterForm"

export const metadata : Metadata = {
    title: 'Cashtracker - Crear Cuenta',
    description:'Cashtracker - Crear Cuenta'
}

export default function RegisterPage() {


    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Crear una cuenta</h1>
            <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">finanzas</span></p>

           <RegisterForm/>
        </>
    )
}
