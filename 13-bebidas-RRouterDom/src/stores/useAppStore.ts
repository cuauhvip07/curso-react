
import { create } from 'zustand'
import { createRecipesSlice } from './recipeSlice'


// ...a manda a traer todas las copias (set,get,api) -> Solo se pueden poner en el create
export const useAppStore = create((...a) => ({
    // Se manda a llamar
    ...createRecipesSlice(...a)
}))