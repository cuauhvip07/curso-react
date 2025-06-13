import Image from "next/image"

export default function Logo() {
    return (
        <Image 
            src="/logo.svg" 
            alt="Logo Cashtracker" 
            width={400} 
            height={100}
            priority
        />
    )
}
