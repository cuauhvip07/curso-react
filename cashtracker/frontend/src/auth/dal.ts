// Data Acces Layer

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const verifySession = async () => {
    const token = (await cookies()).get('CASHTRACKER_TOKEN')?.value

    if(!token){
        redirect('/auth/login')
    }
}