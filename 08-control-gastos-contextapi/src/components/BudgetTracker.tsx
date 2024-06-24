

import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';




export default function BudgetTracker() {

    const {state, totalExpenses, remainingBudget} = useBudget()

    // Maximo dos decimales
    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className=" flex justify-center">
            <CircularProgressbar
                value={percentage}
                text={`${percentage}% Gastado`}
                styles={buildStyles({
                    pathColor: percentage > 80 ? '#DC2626' : '#3B82F6',
                    textColor: percentage > 80 ? '#DC2626' :  '#3B82F6',
                    trailColor: '#F5F5F5',
                    textSize:8

                })}
            />
        </div>

        <div className=" flex flex-col justify-center items-center gap-8">
            <button
                type="button"
                className=" bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
            >
                Resetear App
            </button>

            <AmountDisplay
            label="Presupuesto"
            amount={state.budget}
            />

            <AmountDisplay
                label="Disponible"
                amount={remainingBudget}
            />

            <AmountDisplay
                label="Gastado"
                amount={totalExpenses}
            />
        </div>

        
        

    </div>
  )
}
