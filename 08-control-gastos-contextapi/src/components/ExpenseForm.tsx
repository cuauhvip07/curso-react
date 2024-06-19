import { useState, ChangeEvent } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker'

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';






export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount:0,
        expenseName:'',
        category:'',
        date: new Date()
    })

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

  return (
    <form className=" space-y-5">
        <legend className=" uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">Nuevo Gasto</legend>

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