
export function formarCorrency(amount: number){
    return new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD'
    }).format(amount)
}

export function toBoolean(str: String){
    return str.toLowerCase() === "true"
}