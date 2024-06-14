
import { useState } from "react"
import type { MenuItem, OrderItem } from "../types";

export default function useOrder(){

    const [order, setOrder] = useState<OrderItem[]>([]);
    const [tip,setTip] = useState(0);

   
    const removeItem = (id : MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id))
    }

    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }

    return{
        order,
        tip,
        setTip,
        removeItem,
        placeOrder,
    }
}