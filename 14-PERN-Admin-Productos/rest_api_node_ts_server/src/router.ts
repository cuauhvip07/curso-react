import { Router } from 'express'
import { createProduct } from './handlers/product'

export const router = Router()
// 4. Creacion del router (tambien se puede con server)

// Routing 
router.get('/', (req,res) => {
    res.json('Desde get')
})

router.post('/', createProduct)

router.put('/', (req,res) => {
    res.json('Desde put')
})

router.patch('/', (req,res) => {
    res.json('Desde patch')
})

router.delete('/', (req,res) => {
    res.json('Desde delete')
})

