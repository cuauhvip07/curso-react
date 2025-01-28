import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { validateCreateAccount, validateEmail, validateInputs, validatePassword, validateToken, validateTokenParam } from "../middleware/auth";
import { limiter } from "../config/limiter";

const router = Router()

router.use(limiter)

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

router.post('/login',
    
    validateInputs,
    handleInputErrors,
    AuthController.login
)

router.post('/forgot-password',
    validateEmail,
    handleInputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token',
    validateToken,
    handleInputErrors,
    AuthController.validateToken
)

router.post('/reset-password/:token',

    validatePassword,
    validateTokenParam,
    handleInputErrors,
    AuthController.resetPasswordWithToken
)

export default router