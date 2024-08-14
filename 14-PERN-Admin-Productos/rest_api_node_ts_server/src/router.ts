
import { Router } from 'express'
import { createProduct } from './handlers/product'
import { handleInputErrors } from './middleware'
import { body } from 'express-validator'
// import { body } from 'express-validator'  Validar en el router 

const router = Router()



// Routing 
router.get('/', (req,res) => {

    res.json('Desde get')
})

router.post('/', 
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price').
        custom( value => value > 0).withMessage('Precio no valido').
        isNumeric().withMessage('El valor debe ser numerico').
        notEmpty().withMessage('El precio del producto no puede ir vacio'),
    handleInputErrors,
    createProduct
)

router.put('/', (req,res) => {

    res.json('Desde put')
})

router.patch('/', (req,res) => {

    res.json('Desde patch')
})

router.delete('/', (req,res) => {

    res.json('Desde delete')
})

export default router

