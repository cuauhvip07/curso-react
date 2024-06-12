import { Activity } from "../types"

type ActivityState = {
    activities : Activity[],
    activeId : Activity['id'],
}

export type ActivityActions = 
    // El type describe que es lo que esta sucediendo
    // payload son los datos que se va agregando 
    {type: 'save-activity', payload: {newActivity : Activity} } |
    {type: 'set-activeId', payload: {id : Activity['id']} 

}
    


export const initialState : ActivityState = {
    activities: [],
    activeId: '',
}

export const activityReducer = (
    state : ActivityState = initialState, 
    action : ActivityActions
    ) => {
    
    if(action.type === 'save-activity'){
        // Este codigo maneja toda la logica para actualizar el estado
        
        
        return {
            // Obtenemos una copia del state para no perder la referncia de los datos
            ...state,
            // action.payload... te trea la informacion del formulario
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    if(action.type === 'set-activeId'){
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    return state
}