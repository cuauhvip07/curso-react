import { OrderItem, MenuItem } from "../types"
import { formartCurrency } from "../helpers"

type OrderContentProps = {
    order: OrderItem[]
    removeItem: (id :MenuItem['id']) => void
}


export default function OrderContent({order,removeItem} : OrderContentProps) {
  return (
    <div>
        <h2 className="font-black text-4xl">Consumo</h2>

        <div className="space-y-3 mt-10">
            {order.length === 0 ? 
                <p className=" text-center">La orden esta vacia</p>
            :
                ( order.map(item => (
                    <div 
                        key={item.id}
                        className="flex justify-between border-t border-gray-200 py-5 last-of-type:border-b items-center"    
                    >
                       <div>
                            <p className="text-lg">{item.name} - {formartCurrency(item.price)}</p>
                            <p className=" font-black">Cantidad: {item.quantity} - {formartCurrency(item.price * item.quantity)}</p>
                       </div>
                        <button 
                          className="bg-red-600 h-8 w-8 rounded-full text-white font-black"
                          onClick={() => removeItem(item.id)}
                        > 
                        X 
                        </button>
                    </div>
                )))
                
            }
        </div>
    </div>
  )
}
