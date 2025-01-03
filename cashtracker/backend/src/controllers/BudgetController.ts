import { Request, Response } from "express"


export class BudgetController{

    static getAll = async (req: Request, res: Response) => {
        console.log('Desde api/budget')
    }

    static create = async (req : Request, res: Response) => {
        console.log('Desde POST ')
    }
}