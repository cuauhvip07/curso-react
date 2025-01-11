import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExist, validateBudgetId, validateBudgetInput } from "../middleware/budget";
import { ExpenseController } from "../controllers/ExpenseController";
import { validateExpenseExiste, validateExpenseId, validateExpenseInput } from "../middleware/expense";


const router = Router()

router.param('budgetId',validateBudgetId) // Valida por id y pone el middleware a las rutas que tengan id
router.param('budgetId',validateBudgetExist)

router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExiste)

router.get('/', BudgetController.getAll)


router.get('/:budgetId',
    // validateBudgetId, Ya no se pone aqui ya que esta en el router.param
    //validateBudgetExist,
    BudgetController.getById
)


router.post('/', 
    
    validateBudgetInput,
    handleInputErrors,
    BudgetController.create
)



router.put('/:budgetId', 
    
    
    // body('name')
    //     .notEmpty().withMessage('El nombre del presupuesto es obligatorio'),
    // body('amount')
    //     .notEmpty().withMessage('La cantidad del presupuesto no puede ir vacia')
    //     .isNumeric().withMessage('La cantidad debe ser un numero')
    //     .custom(value => value > 0).withMessage('La cantidad debe ser mayor a cero'), En lugar de tener todo este codigo
    validateBudgetInput,
    handleInputErrors,
    BudgetController.updateById
)

router.delete('/:budgetId',BudgetController.deleteById)



// ROUTES FOR EXPENSES

router.post('/:budgetId/expenses', 
    validateExpenseInput,
    handleInputErrors,
    ExpenseController.create
)


router.get('/:budgetId/expenses/:expenseId',ExpenseController.getById)

router.put('/:budgetId/expenses/:expenseId',
    validateExpenseInput,
    handleInputErrors,
    ExpenseController.updateById
)
router.delete('/:budgetId/expenses/:expenseId',ExpenseController.deleteById)







export default router