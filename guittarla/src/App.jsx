import { useEffect, useState } from 'react'
import Header from "./components/Header"
import Guittar from "./components/Guittar"
import { db } from './data/db'

function App() {
    
    const [data, setData] = useState(db);
    const [cart, setCart] = useState([]);

    const MAX_COUNT = 5;
    const MIN_COUNT = 1;

    function addToCart(item){

        // Una manera 
        // const existe = cart.some( carrito => carrito.id === item.id)

        // if(existe){
        //     const nuevo = cart.map( carrito => {
        //         if(carrito.id === item.id){
        //             carrito.quantity ++
        //             return carrito
        //         }else{
        //             return carrito
        //         }
        //     })
        //     setCart([...nuevo])
        // }
        // else{
        //     item.quantity = 1
        //     setCart([...cart,item])
           
        // }

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

  return (
    <>
     <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
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
