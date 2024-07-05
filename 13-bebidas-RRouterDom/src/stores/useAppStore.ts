
import { create } from 'zustand'
import { RecipesSliceTypes, createRecipesSlice } from './recipeSlice'


// ...a manda a traer todas las copias (set,get,api) -> Solo se pueden poner en el create
export const useAppStore = create<RecipesSliceTypes>((...a) => ({
    // Se manda a llamar
    ...createRecipesSlice(...a)
}))