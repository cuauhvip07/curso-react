"use client"

import { confirmAccount } from '@/actions/confirm-account-action'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'

import { startTransition, useActionState, useEffect, useState } from 'react'
import ErrorMessage from '../ui/ErrorMessage'
import SuccessMessage from '../ui/SuccessMessage'

export default function ConfirmAccountForm() {

  const [isComplete, setIsComplete] = useState(false)



  const [token, setToken] = useState("")

  // .bind -> Genera una nueva funcion y en lugar de tener se pasa el confirmAccountWithToken al useActionState
  // const [state,formAction,isPending] = useActionState(confirmAccount,{
  // .bind -> Se pasan dos parametros -> Genera una copia de confirmAccount
  const confirmAccountWithToken = confirmAccount.bind(null, token)

  const [state, formAction, isPending] = useActionState(confirmAccountWithToken, {
    errors: [],
    success: ''
  })

  const handleChange = (token: string) => {
    setToken(token)
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  // Dispara el server action cuando todo los numeros esten completos
  useEffect(() => {
    if (isComplete) {

      startTransition(() => {
        formAction()
      })
    }

  }, [isComplete])

  return (
    <>
      {state.errors.map(error => <ErrorMessage>{error}</ErrorMessage>)}
      {state.success && <SuccessMessage>{state.success}</SuccessMessage>}
      
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
    </>
  )
}
