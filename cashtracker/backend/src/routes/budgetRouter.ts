import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";

const router = Router()

router.get('/', BudgetController.getAll)
router.get('/:id', BudgetController.getById)
router.post('/', BudgetController.create)
router.put('/:id', BudgetController.updateById)
router.delete('/:id', BudgetController.deleteById)



export default router