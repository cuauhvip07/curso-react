import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";


const router = Router()

router.get('/', BudgetController.getAll)


router.get('/:id',
    param('id')
    .isInt().withMessage('ID no valido')
    .custom(value => value > 0).withMessage('ID no valido'),
    handleInputErrors,
    BudgetController.getById
)


router.post('/', 
    body('name')
        .notEmpty().withMessage('El nombre del presupuesto es obligatorio'),
    body('amount')
        .notEmpty().withMessage('La cantidad del presupuesto no puede ir vacia')
        .isNumeric().withMessage('La cantidad debe ser un numero')
        .custom(value => value > 0).withMessage('La cantidad debe ser mayor a cero'),
    handleInputErrors,
    BudgetController.create
)



router.put('/:id', BudgetController.updateById)



router.delete('/:id', BudgetController.deleteById)






export default router