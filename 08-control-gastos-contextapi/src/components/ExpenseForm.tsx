import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker'
import { useBudget } from "../hooks/useBudget";

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";






export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount:0,
        expenseName:'',
        category:'',
        date: new Date()
    })

    const [error,setError] = useState('');
    const {state,dispatch} = useBudget();

    useEffect(() => {
        if(state.editingId){
            const editingExpense = state.expenses.filter( expense => expense.id === state.editingId)[0]
            setExpense(editingExpense)
        }
    },[state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name,value} = e.target
        const isAmountField = ['amount'].includes(name);
        
        setExpense({
            ...expense, 
            [name]: isAmountField ? +value : value
        })

    }

    // Se crea una aparte ya que esta es una dependencia

    const handleChangeDate = (value: Value) => {
        setExpense({...expense, date:value})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validar el formulario
        if(Object.values(expense).includes('')){
           setError('Todos los campos son obligatorios')
            return 
        }

        // Agregar o actualizar el gasto
        if(state.editingId){
            // En el payload le decimos al expense que tome el id del state y tome una copia del expense
            dispatch({type:'update-expense', payload:{expense: {id:state.editingId, ...expense}}})
        } else{
            dispatch({type:'add-expense', payload:{expense}})
        }
       

        //Reiniciar el formulario
        setExpense({
            amount:0,
            expenseName:'',
            category:'',
            date: new Date()
        })
        
    }

  return (
    <form className=" space-y-5" onSubmit={handleSubmit}>
        <legend className=" uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">Nuevo Gasto</legend>

        {/* Se muestran los errores  */}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className=" flex flex-col gap-2 ">
            <label 
                htmlFor="expenseName"
                className=" text-xl"
            >
                Nombre Gasto:
            </label>

            <input 
                type="text" 
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className=" bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>

        <div className=" flex flex-col gap-2 ">
            <label 
                htmlFor="amount"
                className=" text-xl"
            >
                Cantidad:
            </label>

            <input 
                type="number" 
                id="amount"
                placeholder="Añade la cantidad del gasto Ej. 300"
                className=" bg-slate-100 p-2"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className=" flex flex-col gap-2 ">
            <label 
                htmlFor="category"
                className=" text-xl"
            >
                Categoria:
            </label>

            <select 
                name="category" 
                id="category"
                className=" bg-slate-100 p-2"
                value={expense.category}
                onChange={handleChange}
            >
                <option value="">-- Seleccione --</option>
                {categories.map(category => (
                    <option 
                        value={category.id}
                        key={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className=" flex flex-col gap-2 ">
            <label 
                htmlFor="amount"
                className=" text-xl"
            >
                Fecha gasto:
            </label>

           <DatePicker 
                className=" bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
           />
        </div>

        <input 
            type="submit" 
            className=" bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" 
            value={"Registrar Gasto"}
        />

        
    </form>
  )
}
