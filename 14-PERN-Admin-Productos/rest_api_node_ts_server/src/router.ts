
import { Router } from 'express'

const router = Router()



// Routing 
router.get('/', (req,res) => {

    // Mandar datos hacia la pantalla
    // res.send(data)    Esta es otra manera para mandar los datos
    res.json('Desde get')
})

router.post('/', (req,res) => {

    res.json('Desde post')
})

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

