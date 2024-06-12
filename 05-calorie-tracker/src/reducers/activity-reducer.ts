import { Activity } from "../types"

export type ActivityState = {
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

        let updatedActivities : Activity[] = []

        // Si el activeId tiene un id, entonces se ejecuta el codigo
        if(state.activeId){
           updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        }else{
            // action.payload... te trea la informacion del formulario
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        
        
        return {
            // Obtenemos una copia del state para no perder la referncia de los datos
            ...state,
            activities: updatedActivities,
            activeId: '',
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