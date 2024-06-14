
import { useEffect, useState } from 'react'
import type {  CartItem } from '../types'

export const useCart = () => {
    // Comprueba si hay valores en caso de que no, lo inicia con un arreglo vacio
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState(initialCart);


    // Se ocupauseEffect ya que como el state es asincrono, ahora cada que cambie cart se ejecuta el codigo 
    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cart));
    },[cart])

   


   

    function resetCar(){
        setCart([])
    }

    

    return {
        cart,
        resetCar,
    }
}