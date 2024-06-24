
// Creacion del context
import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number,
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode // Este se ocupa para los children ya que puede varia su valor
}

// Se debe de pasar un valor . El null es para que desaparezca el error
export const BudgetContext = createContext<BudgetContextProps>(null!)

// Datos que va a tener el context
export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer,initialState);


    const totalExpenses = useMemo(() => state.expenses.reduce((total,expense) => expense.amount + total, 0) ,[state.expenses])

    const remainingBudget = state.budget - totalExpenses

    return(
        <BudgetContext.Provider
            // Siempre inicia con llaves pero se deben de abrir otras llaves para pasar los parametros
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget,

            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}