

import { StateCreator } from "zustand"
import { FavoritesSliceType } from "./favoritesSlice"

type Notification = {
    text: string
    error: boolean
    show: boolean
}

export type NotificationSliceTypes = {
    notification: Notification
    showNotificaction: (payload: Pick<Notification,'text' | 'error'>) => void // Solo tome texto o error
    hideNotification: () => void
}

// Se le agrega el StateCreator para tiparlo
// El & es cuando se manda llamar el slice en otro slice, los [] [] es que no pasas parametros y al ultimo el type que se utiliza en este slice
export const createNotificationSlice : StateCreator<NotificationSliceTypes & FavoritesSliceType, [], [], NotificationSliceTypes>  = (set,get) => ({

    notification: {
        text: '',
        error: false,
        show: false
    },

    showNotificaction: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })

        setTimeout(() => {
            get().hideNotification()
        }, 5000);
    },
    hideNotification : () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false
            },
        })
    }
    
})