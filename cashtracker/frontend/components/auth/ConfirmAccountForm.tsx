"use client"

import { confirmAccount } from '@/actions/confirm-account-action'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { startTransition, useActionState, useEffect, useState } from 'react'
import ErrorMessage from '../iu/ErrorMessage'
import SuccessMessage from '../iu/SuccessMessage'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function ConfirmAccountForm() {

    const router = useRouter()

    const [isComplete, setIsComplete] = useState(false)
    const [token, setToken] = useState("")
    const [showMessages, setShowMessages] = useState(false)

    const confirmAccountWithToken = confirmAccount.bind(null, token)
    const [state, formAction, pending] = useActionState(confirmAccountWithToken, {
        errors: [],
        success: ''
    })

    


    useEffect(() => {
        if (isComplete) {
            startTransition(() => {
                formAction()
            })
        }
    }, [isComplete])

    const handleChange = (token: string) => {
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }



    useEffect(() => {
        if (state.errors.length === 0 && !state.success) return;

        const timeout = setTimeout(() => {
            setShowMessages(false);
            if(state.success){
                router.push('/auth/login');
            }
        }, 5000);

        setShowMessages(true);

        if (state.errors.length > 0) {
            state.errors.forEach(error => {
                toast.error(error, { draggable: true });
            });
        }

        if (state.success) {
            toast.success(state.success, { draggable: true, autoClose: 4000 });
        }

        return () => clearTimeout(timeout);
    }, [state.errors, state.success]);


    return (
        <>
            {
                showMessages && (
                    <>
                        {state.errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}

                        {
                            state.success && (
                                <SuccessMessage>{state.success}</SuccessMessage>
                            )
                        }
                    </>
                )

            }
            <div className=' flex justify-center gap-5 my-10'>

                <PinInput
                    value={token}
                    onChange={handleChange}
                    onComplete={handleComplete}
                >
                    <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
                    <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
                    <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
                    <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
                    <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
                    <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
                </PinInput>
            </div>
        </>
    )
}
