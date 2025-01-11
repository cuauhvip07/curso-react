import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { validateCreateAccount } from "../middleware/auth";

const router = Router()

router.post('/create-account', 
    validateCreateAccount,
    handleInputErrors,
    AuthController.createAccount
)


export default router