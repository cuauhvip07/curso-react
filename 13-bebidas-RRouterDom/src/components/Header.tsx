import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";



export default function Header() {

    const [searchFilters, setSearchFilter] = useState({
        ingredient: '',
        category: ''
    })

    const location = useLocation()
    
    // Comprobar si esta en la pagina de inicio
    const isHome = useMemo(() => location.pathname === '/' ,[location.pathname])

    const {fetchCategories,categories,searchRecipes,showNotificaction} = useAppStore()

    useEffect(() => {
        fetchCategories()
    },[])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilter({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(searchFilters).includes('')){
            showNotificaction({text:'Todos los campos son obligatorios', error: true})
            return
        }

        // Consultar las recetas
        searchRecipes(searchFilters)
    }

  return (

    <header className={ isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
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

            {isHome && (
                <form 
                    className="md:w-1/2 2xl:w-1/3 bg-orange-400 mt-32 p-10 rounded-lg shadow space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className=" space-y-4">
                        <label 
                            htmlFor="ingredient"
                            className=" block text-white uppercase font-extrabold text-lg"
                        >
                            Nombre o Ingredientes
                        </label>

                        <input 
                            type="text" 
                            id="ingredient"
                            name="ingredient"
                            className="p-3 w-full rounded-lg focus:outline-none"
                            placeholder="Nombre o Ingrediente. Ej: Vodka, Tequila, Café"
                            onChange={handleChange}
                            value={searchFilters.ingredient}
                        />
                    </div>

                    <div className=" space-y-4">
                        <label 
                            htmlFor="category"
                            className=" block text-white uppercase font-extrabold text-lg"
                        >
                            Categoria
                        </label>

                        <select 
                            name="category" 
                            id="category"
                            className="p-3 w-full rounded-lg focus:outline-none text-gray-500"
                            onChange={handleChange}
                            value={searchFilters.category}
                        >
                            <option value="">-- Seleccione --</option>
                            {categories.drinks.map(category => (
                                <option 
                                    value={category.strCategory}
                                    key={category.strCategory}
                                >
                                    {category.strCategory}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input 
                        type="submit" 
                        value='Buscar Recetas'
                        className=" cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                    />

                </form>
            )}
        </div>
    </header>
  )
}
