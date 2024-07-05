import { StateCreator } from "zustand"

type Category = {}

export type RecipesSliceTypes = {
    categories: Category[]
}

// Se le agrega el StateCreator para tiparlo
export const createRecipesSlice : StateCreator<RecipesSliceTypes> = () => ({
    categories:[]
})