
import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"


export async function action ({request} : ActionFunctionArgs){ // Request es ncesario
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

  await addProduct(data) 


  return redirect('/') // Se debe de retornar algo obligatoriamente o redireccionar al usuario
}



export default function NewProduct() {

  const error = useActionData() as string // UsaruseActionData -> Querer tener el resultado de una action (formulario)
  

  return (
    <>
      <div className=" flex justify-between">
        <h2 className=" text-4xl font-black text-slate-500">Registrar Producto</h2>
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
      
        <ProductForm/>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>

    </>
  )
}
