import { Router } from 'express'
import { createProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'

export const router = Router()
// 4. Creacion del router (tambien se puede con server)

// Routing 
router.get('/', getProducts)

router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'), // params ya que es un parametro
    handleInputErrors,
    getProductById
)

// 10. Se pasa hacia una funcion aparte
router.post('/', 

    // 13.1.  Validacion
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .isNumeric().withMessage('Valor no valido')
        .custom(valor => valor > 0).withMessage('Precio no valido'),

        handleInputErrors,
    
    createProduct

)

router.put('/:id', 
     // 13.1.  Validacion
     body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),

     body('price')
         .notEmpty().withMessage('El precio no puede ir vacio')
         .isNumeric().withMessage('Valor no valido')
         .custom(valor => valor > 0).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct,

)

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido')
    ,handleInputErrors
    ,updateAvailability

)

router.delete('/', (req,res) => {
    res.json('Desde delete')
})

