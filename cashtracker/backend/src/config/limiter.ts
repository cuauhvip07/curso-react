import {rateLimit} from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 60 * 1000 ,      // Cuanto tiempo va a recordar el request
    limit: 5, // Cuanto request vamos a permitir por minuto
    message: {"error":"Haz alcanzado el límite de peticiones"}
})