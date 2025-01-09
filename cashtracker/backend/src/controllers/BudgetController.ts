import { Request, Response } from "express"
import Budget from "../models/Budget"


export class BudgetController{



    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order:[
                    ['createdAt','DESC']
                ],
                // TODO: Filtrar por el usuario autenticado
                // limit:1
                // where: {
                //     name:'Vacaciones'
                // }
            })
            res.json(budgets)
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
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
        
        try {
            const {id} = req.params
            const budget = await Budget.findByPk(id)

            if(!budget){
                const error = new Error('Presupuesto no encontrado')
                res.status(404).json({error:error.message})
                return
            }
            res.json(budget)
        } catch (error) {
            res.status(500).json('Hubo un error')
        }
    }



    static updateById = async (req: Request, res: Response) => {
        
        try {
            const {id} = req.params
            const budget = await Budget.findByPk(id)

            if(!budget){
                const error = new Error('Presupuesto no encontrado')
                res.status(404).json({error:error.message})
            }

            // Escribir los cambios del body
            await budget.update(req.body)
            res.json('Presupuesto actualizado correctamente')
        } catch (error) {
            res.status(500).json('Hubo un error')
        }
    }



    static deleteById = async (req: Request, res: Response) => {
        
        try {
            
            const {id} = req.params
            const budget = await Budget.findByPk(id)
            
            if(!budget){
                const error = new Error('Presupuesto no encontrado')
                res.status(404).json({error:error.message})
            }
            await budget.destroy()
            res.json('Prespuesto eliminado exitosamente')

        } catch (error) {
            res.status(500).json('Hubo un error')
        }


    }


}