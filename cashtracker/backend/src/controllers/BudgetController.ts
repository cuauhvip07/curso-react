import { request, Request, Response } from "express"
import Budget from "../models/Budget"
import Expense from "../models/Expense"


export class BudgetController{



    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order:[
                    ['createdAt','DESC']
                ],
                where: {
                    userId: req.user.id
                }
            })
            res.json(budgets)
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
    }



    static create = async (req : Request, res: Response) => {
        try {
            const budget = new Budget(req.body)
            budget.userId = req.user.id
            await budget.save()
            // Si quieres extarer info del usuario cuando se cree puedes crear una variabel 
            // const infoUser = awar budget.save()
            res.status(201).json('Presupuesto creado correctamente')
            return
        } catch (error) {
            // console.log(error)
            res.status(500).json({error:'Hubo un error'})
        }
    }



    static getById = async (req: Request, res: Response) => {
        
        // El codigo de traer los datos se paso al middleware de budget
        const budget = await Budget.findByPk(req.budget.id, {
            include: [Expense]    // Traerse los gastos de un presuspuesto -> Usar la relacion
        })
        
        res.json(budget)
    }



    static updateById = async (req: Request, res: Response) => {
        // Escribir los cambios del body
        await req.budget.update(req.body)
        res.json('Presupuesto actualizado correctamente')
    }



    static deleteById = async (req: Request, res: Response) => {
        
        await req.budget.destroy()
        res.json('Prespuesto eliminado exitosamente')
    }


}