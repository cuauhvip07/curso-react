import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { validateCreateAccount, validateToken } from "../middleware/auth";

const router = Router()

router.post('/create-account', 
    validateCreateAccount,
    handleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-acount',
    validateToken,
    handleInputErrors,
    AuthController.confirmAccount
)


export default router