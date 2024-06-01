import {  useCallback } from "react"
import { OrderItem } from "../types"
import { formartCurrency } from "../helpers"

type OrderTotalsProps = {
    order: OrderItem[]
    tip: number
    placeOrder: () => void
}


export default function OrderTotals({order,tip,placeOrder}: OrderTotalsProps) {

    const subtotalAmount =  useCallback(() => order.reduce((total, item) => total + (item.quantity * item.price),0),[order])
    const tipAmount =  useCallback(() => subtotalAmount() * tip, [tip, order])
    const totalAmount = useCallback( () => subtotalAmount() + tipAmount(), [tip,order])

  return (
    <>

      <div className=" space-y-3">
        <h2 className=" font-black text-2xl">Totales y Propinas</h2>
        <p>
            Subtotal a pagar: {''}
            <span className=" font-bold">{formartCurrency(subtotalAmount())}</span>
        </p>

        <p>
            Propina: {''}
            <span className=" font-bold">{formartCurrency(tipAmount())}</span>
        </p>

        <p>
            Total a pagar: {''}
            <span className=" font-bold">{formartCurrency(totalAmount())}</span>
        </p>
      </div>

      <button
        className=" w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
        disabled={totalAmount() === 0}
        onClick={placeOrder}
      >
        Guardar Orden
      </button>
    </>
  )
}
