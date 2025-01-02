
import { Link, useLoaderData } from "react-router-dom"
import { getProducts } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"

export async function loader(){
  // Se obtienen los datos antes de que el componente este listo
  // Siempre debe de retornar algo
  const products = await getProducts()
  
  
  return products
}

export async function action(){
  console.log('desde action actualzar')
  return {}
}

export default function Products() {

  const products = useLoaderData() as Product[] // useLoaderData -> Cargar información de una API

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

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
              <tr>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Disponibilidad</th>
                  <th className="p-2">Acciones</th>
              </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductDetails
              key={product.id}
                product = {product}
              />
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}
