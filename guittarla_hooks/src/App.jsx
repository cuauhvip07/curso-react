import { useEffect, useState } from 'react'
import Header from "./components/Header"
import Guittar from "./components/Guittar"
import { db } from './data/db'
import { useCart } from './hooks/useCart'

function App() {

    const {auth} = useCart()
    console.log(auth)

    // Comprueba si hay valores en caso de que no, lo inicia con un arreglo vacio
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_COUNT = 5;
    const MIN_COUNT = 1;

    // Se ocupauseEffect ya que como el state es asincrono, ahora cada que cambie cart se ejecuta el codigo 
    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cart));
    },[cart])

    function addToCart(item){


        // Validar si el elemento existe
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)

        if(itemExists >= 0){ // Existe en el carrito
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }else{
            item.quantity = 1
            setCart([...cart, item])
        }

       
    }

    function removeFromCart(id){
        setCart(prevCart => prevCart.filter( guitar => guitar.id !== id))
    }

    function increaseQuantity(id){
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

    function decreaseQuantity(id){
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


  return (
    <>
     <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        resetCar={resetCar}
     />
        

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                
                {data.map(guitar => (
                    <Guittar 
                        key={guitar.id}
                        guitar={guitar}
                        addToCart={addToCart}
                    />
                ))}

            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>

    </>
  )
}

export default App
