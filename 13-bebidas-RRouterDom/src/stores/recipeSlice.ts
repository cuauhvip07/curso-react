import { StateCreator } from "zustand"
import { getCategories, getRecipes, getRecipesById } from "../services/RecipeService"
import type { Categories, Drink, Drinks, SearchFilter } from "../types"


export type RecipesSliceTypes = {
    categories: Categories,
    drinks: Drinks
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter ) => Promise<void>
    selecetRecipe: (id: Drink['idDrink']) => Promise<void>
}

// Se le agrega el StateCreator para tiparlo
export const createRecipesSlice : StateCreator<RecipesSliceTypes> = (set) => ({

    categories:{
        drinks:[]
    },
    // Es dos veces drinks por que el API asi lo trae
    drinks: {
        drinks: []
    },
    
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },

    searchRecipes: async (searchFilters) => {
       const drinks = await getRecipes(searchFilters)
       set({
        drinks
       })
    },

    selecetRecipe: async (id) => {
        const selectedRecipe = await getRecipesById(id)
        console.log(selectedRecipe)
    }
})