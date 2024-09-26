
import { Request, Response } from "express"

// 11. Se crea la funcion

export const createProduct = (req : Request, res: Response) => {
    res.json('Desde post')
}