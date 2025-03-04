// Dal -> Data Acces Layer
import "server-only"   // Se importa este server only y ayuda a que no se vaya el codigo hacia el cliente
import { cache } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { UserSchema } from "../schemas"

// Capa donde se ve si un usuario tiene acceso y puede acceder a los recursos 

export const verifySession = cache(async () => {
    const token = (await cookies()).get('CASHTRACKER_TOKEN')?.value

    if(!token){
        redirect('/auth/login')
    }

    // Validar el JWT

    const url = `${process.env.API_URL}/auth/user`

    const req = await fetch(url,{ // Si es get, no es necesario definir el metodo
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    const session = await req.json()
    const result = UserSchema.safeParse(session)
    
    if(!result.success){
        redirect('/auth/login')
    }

    return {
        user: result.data,
        isAuth: true
    }
    
})