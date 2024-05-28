import { useEffect, useState } from 'react'
import Header from "./components/Header"
import Guittar from "./components/Guittar"

function App() {
    // state 
    const [auth, setAuth ] = useState(false)
    
    useEffect(() => {
       if(auth === true){
        console.log('Esta en true')
       }
    },[auth])

    setTimeout(() => {
        setAuth(true)
    }, 3000);

  return (
    <>
     <Header/>
        

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
               
                <Guittar/>
                
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
