import { categories } from "../data/categories";



export default function FilterByCategory() {
  return (
    <div className=" bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
            <label htmlFor="category">Filtrar Gastos</label>
            <select 
                name="category" 
                id="category" 
                className=" bg-slate-100 p-3 flex-1 rounded"
            >
                <option value="">--Todas las categorias</option>
                {categories.map(category => (
                    <option 
                        value={category.id}
                        key={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
      </form>
    </div>
  )
}
