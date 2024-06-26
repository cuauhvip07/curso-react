import { ReactNode, createContext, useReducer, Dispatch, useMemo } from "react";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activity-reducer";

type ActivityContextProps = {
    state : ActivityState,
    dispatch: Dispatch<ActivityActions>,
    caloriesConsumed: number,
    caloriesBurned : number,
    netCalories: number
}

type ActivityProviderProps = {
    children: ReactNode
}


export const ActivityContext = createContext<ActivityContextProps>(null!)


export const ActivityProvider = ({children} : ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer,initialState);

    // Contadores
    // Contador de comida
    const caloriesConsumed = useMemo(() => state.activities.reduce((total,activity) => activity.category === 1 ? total + activity.calories : total, 0) ,[state.activities])

    const caloriesBurned = useMemo(() => state.activities.reduce((total,activity) => activity.category === 2 ? total + activity.calories : total , 0),[state.activities]);

    const netCalories = useMemo(() =>  caloriesConsumed - caloriesBurned,[state.activities])


    return (
        <ActivityContext.Provider
            value={{
                state,
                dispatch,
                caloriesConsumed,
                caloriesBurned,
                netCalories
            }}
        >
            {children}
        </ActivityContext.Provider>
    )

}