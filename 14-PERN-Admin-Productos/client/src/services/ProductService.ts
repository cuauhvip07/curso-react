import { safeParse } from "valibot"
import { DraftProductSchema } from "../types"



type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct (data : ProductData){
    try {
        const result = safeParse(DraftProductSchema,{
            name: data.name,
            price: +data.price
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}