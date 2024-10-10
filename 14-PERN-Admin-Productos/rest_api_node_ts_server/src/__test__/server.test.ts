// Agrupar serie de pruebas relacionadas
// Recibe dos parametros -> nombre o texto de la prueba y segundo el call back
describe('Nuestro primer test', () => {
    // test()     -> Se puede usar tambien este o it
    it('Debe de revisar que 1 ´1 sea 2', () => {
        // expect -> Que es lo que espero
        // toBe -> Valor con el cual lo voy a comparar
        expect(1+1).toBe(2)
    })

    it('Debe revisar que 1 + 1 no sea 3', () => {
        expect(1+1).not.toBe(3)
    })
})