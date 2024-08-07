
import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createRecipesSlice, RecipesSliceTypes } from "./recipeSlice"
import { createNotificationSlice, NotificationSliceTypes } from "./notificationSlice"


export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe : Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromSorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipesSliceTypes & NotificationSliceTypes, [], [], FavoritesSliceType> = (set,get,api) => ({
    favorites: [],

    handleClickFavorite: (recipe) => {
        
        if(get().favoriteExists(recipe.idDrink)){
            // En caso de que el favorito si exista -> Si existe se va a eliminar ya que ek boton es de uso de añadir y quitar
            set({
                favorites: get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            })
            createNotificationSlice(set,get,api).showNotificaction({text:'Se elimino de favoritos', error:false })
        } else{
            // En caso de que el favorito no exista
            set({
                favorites: [ ...get().favorites, recipe]
            })
            createNotificationSlice(set,get,api).showNotificaction({text:'Se agrego a favoritos', error:false })
        }
        // Llamado a otro slice
        // Dspues del llamado al slice, se le deben de pasar los tres parametros: set,get,api
        createRecipesSlice(set,get,api).closeModal()
        localStorage.setItem('favorites',JSON.stringify(get().favorites))
        
    },

    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },

    loadFromSorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})