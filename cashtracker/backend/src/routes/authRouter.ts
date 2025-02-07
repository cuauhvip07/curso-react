import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate, validateCreateAccount, validateEmail, validateInputs, validatePassword, validateToken, validateTokenParam } from "../middleware/auth";
import { limiter } from "../config/limiter";
import { body } from "express-validator";

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

router.get('/user',
    authenticate,
    AuthController.user
)

router.post('/update-password',
    authenticate,
    body('current_password')
        .notEmpty().withMessage('El password no puede ir vacio'),
    validatePassword,
    handleInputErrors,
    AuthController.updateCurrentUserPassword
)

router.post('/check-password',
    authenticate,
    body('password')
        .notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
    AuthController.checkPassword
)


export default router