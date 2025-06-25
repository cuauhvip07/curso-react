import { getBudgetById } from "@/src/services/budgets"
import { Metadata } from "next"

export async function generateMetadata({params} : {params:{id:string}}): Promise<Metadata> {

  const {id} = await params

  const budget = await getBudgetById(id)

  return {
    title:`Cashtracker - ${budget.name}`,
    description:`Cashtracker - ${budget.name}`
  }

}


export default async function BudgetDetailsPage({ params }: { params: { id: string } }) {

    const { id } = await params

    const budget = await getBudgetById(id)

    return (
        <>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
                    <p className="text-xl font-bold">Administra tus {''} <span className="text-amber-500">gastos</span></p>
                </div>

            </div>
        </>
    )
}
