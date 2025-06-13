import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Cashtracker - Olvide mi password',
    description: 'Cashtracker - Olvide mi password'
}


import React from 'react'

export default function ForgotPasswordPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">¿Olvidaste tu contraseña?</h1>
            <p className="text-3xl font-bold">aquí puedes <span className="text-amber-500">restablecerla</span></p>

            <ForgotPasswordForm/>
        </>
    )
}
