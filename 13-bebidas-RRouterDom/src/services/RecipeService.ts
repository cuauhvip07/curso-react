
import axios from "axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse } from "../utils/recipes-schema";
import { SearchFilter } from "../types";

export async function getCategories(){
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const {data} = await axios(url);
    
    const result = CategoriesAPIResponseSchema.safeParse(data);
    
    if(result.success){
        return result.data
    }
}

// Consulta del schema

export async function getRecipes(filter : SearchFilter) {
    // Se le agrega el & para que tambien busque por ingrediente
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.category}&i=${filter.ingredient}`
    const {data} = await axios(url);
    console.log(data)
    const result = DrinksAPIResponse.safeParse(data) 
    
    if (result.success){
        return result.data
    }
}