
import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {
    const context = useContext(BudgetContext);

    // Buena practica si no tenemos un context 
    if(!context){
        throw new Error('useBudget must be used within a BudgetProvider')
    }
    return context
}