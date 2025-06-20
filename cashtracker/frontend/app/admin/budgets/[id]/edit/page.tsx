import getToken from "@/src/auth/token"
import { notFound } from "next/navigation"

const getBudgetById = async (budgetId : string) => {

  const url = `${process.env.API_URL}/budgets/${budgetId}`

  const token = await getToken()

  const req = await fetch(url,{
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })

  const json = await req.json()
  
  if(!req.ok){
    notFound()
  }

  return json

}

export default async function EditBudgetPage({ params }: { params: { id: string } }) {

  const { id } = await params

  await getBudgetById(id)

  return (
    <div>
      EditBudgetPage:
    </div>
  );
}
