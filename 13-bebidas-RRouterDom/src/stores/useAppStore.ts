
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RecipesSliceTypes, createRecipesSlice } from './recipeSlice'
import { createFavoritesSlice, FavoritesSliceType } from './favoritesSlice'


// ...a manda a traer todas las copias (set,get,api) -> Solo se pueden poner en el create
export const useAppStore = create<RecipesSliceTypes & FavoritesSliceType>()(devtools((...a) => ({
    // Se manda a llamar
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a)
})))