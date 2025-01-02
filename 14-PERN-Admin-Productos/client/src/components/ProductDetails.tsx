import { useNavigate, Form, ActionFunctionArgs, redirect } from "react-router-dom"
import { Product } from "../types"
import { formarCorrency } from "../utils"
import { deleteProuduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

export async function action ({params} : ActionFunctionArgs){ 

    if(params.id !== undefined){
        await deleteProuduct(+params.id)
        return redirect('/')
    }

    
}



export default function ProductDetails({product} : ProductDetailsProps) {

    const navigate = useNavigate()

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

            <form action="POST">
                <button
                    type="button"
                    name="availability"
                    value={product.availability.toString()}
                    className={`${isAvailable ? 'text-black' : 'text-red-600 '} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                >
                    {isAvailable ? 'Disponible' : 'No disponible'}
                </button>
            </form>

            
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className=" flex gap-2 items-center">
                <button
                    onClick={() => navigate(`/productos/${product.id}/editar`)}
                    className=" bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                >Editar</button>

                <Form
                    className="w-full"
                    method="POST"
                    action={`productos/${product.id}/eliminar`}
                    onSubmit={(e) => {
                        if(!confirm('Eliminar?')){
                            e.preventDefault()
                        }
                    }}
                >
                    <input
                        type="submit"
                        value="Eliminar"
                        className=" bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                    />
                </Form>

            </div>
        </td>
    </tr> 
  )
}
