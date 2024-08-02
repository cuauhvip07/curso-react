
import { StateCreator } from "zustand"
import { Recipe } from "../types"

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe : Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType> = (set,get,api) => ({
    favorites: [],

    handleClickFavorite: (recipe) => {
        
        if(get().favoriteExists(recipe.idDrink)){
            // En caso de que el favorito si exista -> Si existe se va a eliminar ya que ek boton es de uso de añadir y quitar
            set({
                favorites: get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            })
        } else{
            // En caso de que el favorito no exista
            set({
                favorites: [ ...get().favorites, recipe]
            })
        }
    },

    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    }
})