
import { useEffect, useState } from 'react'
import type { Guitar, CartItem } from '../types'

export const useCart = () => {
    // Comprueba si hay valores en caso de que no, lo inicia con un arreglo vacio
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState(initialCart);

    const MAX_COUNT = 5;
    const MIN_COUNT = 1;

    // Se ocupauseEffect ya que como el state es asincrono, ahora cada que cambie cart se ejecuta el codigo 
    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cart));
    },[cart])

   

    function removeFromCart(id :  Guitar['id']){
        setCart(prevCart => prevCart.filter( guitar => guitar.id !== id))
    }

    function increaseQuantity(id :  Guitar['id']){
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_COUNT){
                return {
                    // Retorna el item y por separado el valor del item
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id :  Guitar['id']){
        const updateCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_COUNT){

                return{
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function resetCar(){
        setCart([])
    }

    

    return {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        resetCar,
    }
}