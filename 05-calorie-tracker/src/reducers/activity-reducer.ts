import { Activity } from "../types"

type ActivityState = {
    activities : Activity[]
}

export type ActivityActions = {

}

export const initialState : ActivityState = {
    activities: []
}

export const activityReducer = (state : ActivityState = initialState, action : ActivityActions) => {

}