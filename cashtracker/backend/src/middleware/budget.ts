import { Request, Response,NextFunction } from "express"
import { param,validationResult } from "express-validator"
import Budget from "../models/Budget"


// Se delcara de manera global para que no haya error en req.budget que se creo
declare global{
    namespace Express {
        interface Request{
            budget?: Budget
        }
    }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {

    await param('budgetId')
        .isInt().withMessage('ID no valido')
        .custom(value => value > 0).withMessage('ID no valido')
    .run(req)

    
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}

export const validateBudgetExist = async (req: Request, res: Response, next: NextFunction) => {

     
    try {
        const {budgetId} = req.params
        const budget = await Budget.findByPk(budgetId)

        if(!budget){
            const error = new Error('Presupuesto no encontrado')
            res.status(404).json({error:error.message})
            return
        }

        req.budget = budget
        next()

    } catch (error) {
        res.status(500).json('Hubo un error')
    }

    
}