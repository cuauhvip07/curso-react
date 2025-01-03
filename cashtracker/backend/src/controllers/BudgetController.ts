import { Request, Response } from "express"


export class BudgetController{

    static getAll = async (req: Request, res: Response) => {
        console.log('Desde api/budget')
    }

    static create = async (req : Request, res: Response) => {
        console.log('Desde POST ')
    }

    static getById = async (req: Request, res: Response) => {
        console.log('Desde GET ID api/budget')
    }

    static updateById = async (req: Request, res: Response) => {
        console.log('Desde PUT ID api/budget')
    }

    static deleteById = async (req: Request, res: Response) => {
        console.log('Desde DELETE ID api/budget')
    }
}