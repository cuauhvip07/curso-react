

import React from 'react'

export default function ErrorMessage({children} : {children:React.ReactNode}) {
  return (
    <p className=' text-center my-4 border border-red-600 text-red-600 font-bold p-3 uppercase text-sm rounded-2xl bg-red-200'>
      {children}
    </p>
  )
}
