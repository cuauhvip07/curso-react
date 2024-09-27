import { Router } from 'express'
import { createProduct } from './handlers/product'
import { body } from 'express-validator'

export const router = Router()
// 4. Creacion del router (tambien se puede con server)

// Routing 
router.get('/', (req,res) => {
    res.json('Desde get')
})

// 10. Se pasa hacia una funcion aparte
router.post('/', 

    // 13.1.  Validacion
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .isNumeric().withMessage('Valor no valido')
        .custom(valor => valor > 0).withMessage('Precio no valido'),
    
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

