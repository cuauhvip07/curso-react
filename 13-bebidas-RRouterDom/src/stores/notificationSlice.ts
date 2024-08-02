

import { StateCreator } from "zustand"

type Notification = {
    text: string
    error: boolean
    show: boolean
}

export type NotificationSliceTypes = {
    notification: Notification
}

// Se le agrega el StateCreator para tiparlo
// El & es cuando se manda llamar el slice en otro slice, los [] [] es que no pasas parametros y al ultimo el type que se utiliza en este slice
export const createNotificationSlice : StateCreator<NotificationSliceTypes>  = (set,get) => ({

    notification: {
        text: '',
        error: false,
        show: false
    }
    
})