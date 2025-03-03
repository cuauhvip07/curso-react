import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

type ValidateTokenFormProps = {
    setIsValidToken: Dispatch<SetStateAction<boolean>>,
    setToken: Dispatch<SetStateAction<string>>,
    token: string
}

export default function ValidateTokenForm({setIsValidToken,setToken,token}: ValidateTokenFormProps) {

    
    const [isCompelte,setIsCompelte] = useState(false)
    const validateTokenInput = validateToken.bind(null,token)
    const [state,formAction] = useActionState(validateTokenInput,{
        errors:[],
        success:''
    })
    

    const handleChange = (token: string) => {
        setToken(token)
        setIsCompelte(false)
    }

    const handleComplete = () => {
        setIsCompelte(true)
    }

    useEffect(() => {
        if(isCompelte){
            startTransition(() => {
                formAction()
            })
        }
    },[isCompelte])

    useEffect(() => {
        if(state.errors){
            state.errors.forEach(error => {
                toast.error(error)
            })
        }

        if(state.success){
            toast.success(state.success)
            setIsValidToken(true)
        }
    },[state])

    return (
        <div className="flex justify-center gap-5 my-10">
            <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
            >
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
            </PinInput>
        </div>
    )
}