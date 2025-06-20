export default async function EditBudgetPage({ params }: { params: { id: string }}) {

  const {id} = await params

  console.log(id)

  return (
    <div>
      EditBudgetPage:
    </div>
  );
}
