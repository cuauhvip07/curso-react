import { ReactNode, createContext, useReducer, Dispatch } from "react";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activity-reducer";

type ActivityContextProps = {
    state : ActivityState,
    dispatch: Dispatch<ActivityActions>
}

type ActivityProviderProps = {
    children: ReactNode
}


export const ActivityContext = createContext<ActivityContextProps>(null!)


export const ActivityProvider = ({children} : ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer,initialState);


    return (
        <ActivityContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </ActivityContext.Provider>
    )

}