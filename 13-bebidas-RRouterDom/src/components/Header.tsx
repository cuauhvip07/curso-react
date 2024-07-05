import { NavLink, useLocation } from "react-router-dom";




export default function Header() {

    const location = useLocation()
    console.log(location.pathname)

  return (

    <header className=" bg-slate-800">
        <div className="mx-auto container px-5 py-16">
            <div className=" flex justify-between items-center">

                <div>
                    <img src="/logo.svg" alt="Logotipo" className="w-32"/>
                </div>

                <nav className=" flex gap-3">
                    {/* NavLink ayuda agregarle js para que resatle en que pagina se encuentra el usuario  */}
                    <NavLink 
                        to={'/'}
                        className={({isActive}) => 
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }
                    >
                        Inicio
                    </NavLink>

                    <NavLink 
                        to={'/favoritos'}
                        className={({isActive}) => 
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }
                    >
                        Favoritos
                    </NavLink>
                </nav>
            </div>
        </div>
    </header>
  )
}
