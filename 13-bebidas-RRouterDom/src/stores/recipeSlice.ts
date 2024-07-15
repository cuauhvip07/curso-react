import { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/RecipeService"
import type { Categories, Drinks, SearchFilter } from "../types"


export type RecipesSliceTypes = {
    categories: Categories,
    drinks: Drinks
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter ) => Promise<void>
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
    }
})