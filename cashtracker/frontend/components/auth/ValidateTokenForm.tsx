import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { startTransition, useActionState, useEffect, useState, Dispatch,SetStateAction } from "react";
import { toast } from "react-toastify";
import ErrorMessage from "../iu/ErrorMessage";
import SuccessMessage from "../iu/SuccessMessage";


type ValidateTokenFormProps = {
    setIsValidToken:Dispatch<SetStateAction<boolean>>,
    token:string,
    setToken:Dispatch<SetStateAction<string>>
}

export default function ValidateTokenForm({setIsValidToken,token,setToken}: ValidateTokenFormProps) {

    
    const [isComplete, setIsComplete] = useState(false)
    const [showMessages, setShowMessages] = useState(false)

    const validateTokenInput = validateToken.bind(null, token)
    const [state, formAction, pending] = useActionState(validateTokenInput, {
        errors: [],
        success: ''
    })

    const handleChange = (token: string) => {
        setIsComplete(false)
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }

    useEffect(() => {
        if (isComplete) {
            startTransition(() => {
                formAction()
            })
        }
    }, [isComplete])

    useEffect(() => {
        if (state.errors.length === 0 && !state.success) return;

        const timeout = setTimeout(() => {
            setShowMessages(false);
        }, 5000);

        setShowMessages(true);


        if (state.success) {
            toast.success(state.success, { draggable: true, autoClose: 4000 });
            setIsValidToken(true)
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
        </>

    )
}