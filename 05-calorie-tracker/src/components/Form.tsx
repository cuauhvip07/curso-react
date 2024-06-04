
import { categories } from "../data/categories"
import { useState } from "react"

export default function Form() {

  const [activity, setActivity] = useState({
    category: 1,
    name: '',
    calories: 0

  })

  const handleChange = (e) => {
   setActivity({
    ...activity,
    [e.target.id]: e.target.value
   })
  }

  return (
    <div>
        <form 
          className=" space-y-5 bg-white shadow p-10 rounded-lg">

          <div className=" grid grid-cols-1 gap-3">

            <label htmlFor="category"className=" font-bold">Categoria:</label>

            <select 
              name="category" 
              id="category" 
              className=" border border-slate-300 p-2 rounded-lg w-full bg-white"
              value={activity.category}
              onChange={handleChange}
            >
              {categories.map(category => (
                <option value={category.id}
                key={category.id}
                >
                  {category.name}
                </option>
              ))}

            </select>
          </div>

          <div className=" grid grid-cols-1 gap-3">

            <label htmlFor="name"className=" font-bold">Actividad:</label>
            <input 
              type="text"
              id="name" 
              className=" border border-slate-300 p-2 rounded-lg"
              placeholder="Ej. Comida, Juego de Naranja, Ejercicio, Pesas"
              value={activity.name}
              onChange={handleChange}
            />

          </div>

          <div className=" grid grid-cols-1 gap-3">

            <label htmlFor="calories"className=" font-bold">Calorias:</label>
            <input 
              type="number"
              id="calories" 
              className=" border border-slate-300 p-2 rounded-lg"
              placeholder="Calorias. Ej. 300 o 500"
              value={activity.calories}
              onChange={handleChange}
            />

          </div>

          <input 
            type="submit"
            className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold text-white uppercase cursor-pointer" 
            value='Guardar comida o guardar ejercicio'
          />

        </form>
    </div>
  )
}
