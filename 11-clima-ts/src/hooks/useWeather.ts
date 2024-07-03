
import axios from "axios"
import { SearchType } from "../types"

export default function useWeather(){

    const fetchWeather = async (search : SearchType) => {

        // Para ocultar el key se crea un archivo .env  para que no se vea desde git, en produccion se hace de otra manera
        const appId = '1c28f86c0355c5c5583307676ccea073'

        try {
            // Consulta de la API y nos da una URL del JSON
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            // Nos da la respuesta tipo FetchAPI con la informacion, status, etc
            const {data} = await axios(geoUrl)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}