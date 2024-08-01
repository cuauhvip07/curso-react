
import { StateCreator } from "zustand"
import { Recipe } from "../types"

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe : Recipe) => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType> = (set,get,api) => ({
    favorites: [],

    handleClickFavorite: (recipe) => {
        
        if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)){
            // En caso de que el favorito si exista -> Si existe se va a eliminar ya que ek boton es de uso de añadir y quitar
            get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
        } else{
            // En caso de que el favorito no exista
            set({
                favorites: [ ...get().favorites, recipe]
            })
        }
    }
})