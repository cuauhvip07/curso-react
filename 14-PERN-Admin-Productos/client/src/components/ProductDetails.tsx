import { Product } from "../types"
import { formarCorrency } from "../utils"

type ProductDetailsProps = {
    product: Product
}



export default function ProductDetails({product} : ProductDetailsProps) {

    const isAvailable = product.availability

  return (

    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formarCorrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {isAvailable ? 'Disponible' : 'No disponible'}
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className=" flex gap-2 items-center">
                <button>Editar</button>
            </div>
        </td>
    </tr> 
  )
}
