import { StateCreator } from "zustand"
import { getCategories, getRecipes, getRecipesById } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import { FavoritesSliceType } from "./favoritesSlice"


export type RecipesSliceTypes = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter ) => Promise<void>
    selecetRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

// Se le agrega el StateCreator para tiparlo
// El & es cuando se manda llamar el slice en otro slice, los [] [] es que no pasas parametros y al ultimo el type que se utiliza en este slice
export const createRecipesSlice : StateCreator<RecipesSliceTypes & FavoritesSliceType, [], [], RecipesSliceTypes>  = (set) => ({

    categories:{
        drinks:[]
    },
    // Es dos veces drinks por que el API asi lo trae
    drinks: {
        drinks: []
    },

    modal: false,

    selectedRecipe: {} as Recipe,
    
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
        
        set({
            selectedRecipe,
            modal: true
        })
    }, 

    closeModal: () => {

        set({
            modal:false,
            selectedRecipe: {} as Recipe
        })
    }
})