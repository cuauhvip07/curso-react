import { Request, Response } from "express"
import Budget from "../models/Budget"


export class BudgetController{

    static getAll = async (req: Request, res: Response) => {
        console.log('Desde api/budget')
    }

    static create = async (req : Request, res: Response) => {
        try {
            const budget = new Budget(req.body)
            await budget.save()
            res.status(201).json('Presupuesto creado correctamente')
            return
        } catch (error) {
            // console.log(error)
            res.status(500).json({error:'Hubo un error'})
        }
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