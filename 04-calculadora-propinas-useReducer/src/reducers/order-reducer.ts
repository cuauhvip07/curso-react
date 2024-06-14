import { MenuItem, OrderItem } from "../types";

// Type son las funciones que se van a ejecutar
// Payload son los parametos de las funciones que se les pasa

export type OrderActions = 
{type: 'add-item',payload:{item: MenuItem}} |
{type: 'removeItem', payload:{id: MenuItem['id']}} |
{type: 'place-order'} |
{type: 'add-tip', payload: {value: number}}

export type OrderState = {
    order: OrderItem[],
    tip: number
}

export const initialState : OrderState = {
    order: [],
    tip: 0
}

export const orderReducer = (
    state: OrderState = initialState,
    action: OrderActions
) => {

    if(action.type === 'add-item'){

        return {

        }
    }

    if(action.type === 'removeItem'){

        return {

        }
    }

    if(action.type === 'place-order'){

        return {

        }
    }

    if(action.type === 'add-tip'){

        return {
            
        }
    }

    return state
}