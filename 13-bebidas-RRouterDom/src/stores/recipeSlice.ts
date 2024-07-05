import { StateCreator } from "zustand"
import { getCategories } from "../services/RecipeService"

type Category = {}

export type RecipesSliceTypes = {
    categories: Category[],
    fetchCategories: () => Promise<void>
}

// Se le agrega el StateCreator para tiparlo
export const createRecipesSlice : StateCreator<RecipesSliceTypes> = () => ({
    categories:[],
    fetchCategories: async () => {
        getCategories()
    }
})