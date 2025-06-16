



export default function SuccessMessage({children} : {children:React.ReactNode}) {
  return (
    <p className=' text-center my-4 border border-green-600 text-green-600 font-bold p-3 uppercase text-sm rounded-2xl bg-green-200'>
      {children}
    </p>
  )
}
