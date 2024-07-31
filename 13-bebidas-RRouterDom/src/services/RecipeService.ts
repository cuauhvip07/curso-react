
import axios from "axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema";
import { Drink, SearchFilter } from "../types";

export async function getCategories(){
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const {data} = await axios(url);
    
    // Validar el schema de la API
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
    const result = DrinksAPIResponse.safeParse(data) 
    
    if (result.success){
        return result.data
    }
}

export async function getRecipesById(id : Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios(url)
    
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    
    if(result.success) {
        return result.data
    }
}