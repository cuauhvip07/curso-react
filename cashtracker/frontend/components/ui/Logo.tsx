import Image from "next/image" // La muestra con buena calidad y ligera

export default function Logo() {
    return (

        // Alt,Width,height es obligatorio
        <Image 
            src="/logo.svg" 
            alt="Logo CashTracker" 
            className=" w-full"
            width={0} 
            height={0} 
            priority
        /> 

    )
}
