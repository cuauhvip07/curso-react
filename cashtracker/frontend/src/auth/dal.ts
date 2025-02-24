// Dal -> Data Acces Layer

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Capa donde se ve si un usuario tiene acceso y puede acceder a los recursos 

export const verifySession = async () => {
    const token = (await cookies()).get('CASHTRACKER_TOKEN')?.value

    if(!token){
        redirect('/auth/login')
    }

    console.log(token)
}