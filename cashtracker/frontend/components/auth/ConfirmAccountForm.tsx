"use client"

import { confirmAccount } from '@/actions/confirm-account-action'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'

import { useActionState, useState } from 'react'

export default function ConfirmAccountForm() {

  const [token, setToken] = useState("")

  const [state,formAction,isPending] = useActionState(confirmAccount,{
    errors:[]
  })

  const handleChange = (token: string) => {
    setToken(token)
  }

  const handleComplete = () => {
    formAction()
  }

  return (
    <div className=' flex justify-center gap-5 my-10'>
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />
        <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />
        <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />
        <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />
        <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />
        <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />
      </PinInput>
    </div>
  )
}
