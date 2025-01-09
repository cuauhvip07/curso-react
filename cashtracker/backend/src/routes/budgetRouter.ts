import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExist, validateBudgetId } from "../middleware/budget";


const router = Router()

router.param('budgetId',validateBudgetId) // Valida por id y pone el middleware a las rutas que tengan id
router.param('budgetId',validateBudgetExist)

router.get('/', BudgetController.getAll)


router.get('/:budgetId',
    // validateBudgetId, Ya no se pone aqui ya que esta en el router.param
    //validateBudgetExist,
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



router.put('/:budgetId', 
    
    
    body('name')
        .notEmpty().withMessage('El nombre del presupuesto es obligatorio'),
    body('amount')
        .notEmpty().withMessage('La cantidad del presupuesto no puede ir vacia')
        .isNumeric().withMessage('La cantidad debe ser un numero')
        .custom(value => value > 0).withMessage('La cantidad debe ser mayor a cero'),
    handleInputErrors,
    BudgetController.updateById
)

router.delete('/:budgetId',BudgetController.deleteById)






export default router