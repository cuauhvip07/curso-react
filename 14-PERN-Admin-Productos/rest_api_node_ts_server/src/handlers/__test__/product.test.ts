import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {
    // Segunda parte de validacion
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({}) // Validar cuando no se envia nada
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    // Tercero Validar que no sea igual a cero o sea un string
    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name:"Monitor Curvo",
            price: "hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })

    // Primera parte de validacion
    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send(
            {
                name: "Mouse TEST",
                price: 300,
            }
        )

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toBe('error')
    })
})