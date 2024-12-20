
import { Link } from "react-router-dom"
import { getProducts } from "../services/ProductService"

export async function loader(){
  // Se obtienen los datos antes de que el componente este listo
  // Siempre debe de retornar algo
  const products = await getProducts()
  console.log(products)

  // Se ocupa un action especial cuando se ocupa un loader
  
  return {}
}


export default function Products() {
  return (
    <>
      <div className=" flex justify-between">
        <h2 className=" text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to={'productos/nuevo'}
          className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar producto
        </Link>
      </div>
    </>
  )
}
