
import { categories } from "../data/categories"
import { useState,ChangeEvent, FormEvent, useEffect } from "react"
import {v4 as uuidv4} from 'uuid'
import { Activity } from "../types"
import { useActivity } from "../hooks/useActivity"


const initialState : Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0

}

export default function Form() {

  const {state,dispatch} = useActivity()

  const [activity, setActivity] = useState<Activity>(initialState)

  // Setear las actividades en el formulario
  useEffect(() => {
    if(state.activeId){
      const selectActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectActivity)
    }
  },[state.activeId])

  // Son dos change por que uno es para input text y el otro es select
  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

    // Identificar los que queremos convertir a numero ya que al principio se pone en string
    const isNumberField = ['category','calories'].includes(e.target.id)
    
   setActivity({
    ...activity,
    [e.target.id]: isNumberField ? +e.target.value : e.target.value
   })
  }

  const isValidActivity = () => {
    const {name,calories} = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    dispatch({type: 'save-activity', payload: {newActivity : activity}})

    // Se reseta el formulario despues de guadar la informacion
    // Se manda a llamar de nuevo el uuidv4 para que genere un nuevo id
    setActivity({...initialState, id:uuidv4()})
  }

  return (
    <div>
        <form 
          className=" space-y-5 bg-white shadow p-10 rounded-lg"
          onSubmit={handleSubmit}
        >

          <div className=" grid grid-cols-1 gap-3">

            <label htmlFor="category"className=" font-bold">Categoria:</label>

            <select 
              name="category" 
              id="category" 
              className=" border border-slate-300 p-2 rounded-lg w-full bg-white"
              value={activity.category}
              onChange={handleChange }
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
            className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold text-white uppercase cursor-pointer disabled:opacity-10 disabled:cursor-default" 
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
          />

        </form>
    </div>
  )
}
