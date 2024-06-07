import { Activity } from "../types"

type ActivityState = {
    activities : Activity[]
}

export type ActivityActions = 
    // El type describe que es lo que esta sucediendo
    // payload son los datos que se va agregando en el state
    {type: 'save-activity', payload: {newActivity : Activity}}

export const initialState : ActivityState = {
    activities: []
}

export const activityReducer = (
    state : ActivityState = initialState, 
    action : ActivityActions
    ) => {
    
    if(action.type === 'save-activity'){
        // Este codigo maneja la logica para actualizar el state
        console.log('Desde el type de save-activity')
    }
}