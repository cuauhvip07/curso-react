
import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct, getProductbyId, updateProduct } from "../services/ProductService"
import { Product } from "../types"

// Traer los parametros del router
export async function loader({params} : LoaderFunctionArgs){

    if(params.id !== undefined){
        const product = await getProductbyId(+params.id)
        console.log(product)

        if(!product){
            return redirect('/')
        }

        return product
    }
    
}


export async function action ({request,params} : ActionFunctionArgs){ // Request es ncesario
  // Object.fromEntries Ayuda acceder a la informacion del formData
  // request.formData() trae la informacion del formulario pero se necesarita la funcion del objet
  const data = Object.fromEntries(await request.formData())
  
  let error = ''
  if(Object.values(data).includes('')){
    error = 'Todos los campos son obligatorios'
  }

  if(error.length){
    return error // Cuando retornas algo, estan disponibles en el componente (Antes del return)
  }

  if(params.id !== undefined){
    await updateProduct(data, +params.id) 
    return redirect('/') // Se debe de retornar algo obligatoriamente o redireccionar al usuario
  }
  


  
}



export default function EditProduct() {

  const error = useActionData() as string // UsaruseActionData -> Querer tener el resultado de una action (formulario)
  
  const product = useLoaderData() as Product

  return (
    <>
      <div className=" flex justify-between">
        <h2 className=" text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link
          to={'/'}
          className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a productos
        </Link>
      </div>

      {error && 
        <ErrorMessage>
          {error}
        </ErrorMessage>
      }

      <Form
        className="mt-10"
        method="POST"
        // action=""   // Accion que se añade para que se conecte con el router
      >
      
        <div className="mb-4">
            <label
              className="text-gray-800"
              htmlFor="name"
            >Nombre Producto:</label>
            <input 
              id="name"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Nombre del Producto"
              name="name"
              defaultValue={product.name} // deaultValue es de React-router-dom
            />
        </div>

        <div className="mb-4">
            <label
              className="text-gray-800"
              htmlFor="price"
            >Precio:</label>
            <input 
              id="price"
              type="number"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Precio Producto. ej. 200, 300"
              name="price"
              defaultValue={product.price}
            />
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Actualizar"
        />
      </Form>

    </>
  )
}