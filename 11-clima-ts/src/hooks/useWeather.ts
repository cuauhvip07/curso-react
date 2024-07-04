
import axios from "axios"
import { SearchType, Weather } from "../types"


// 2. Type Guards
// function isWeatherResponse(weather : unknown) : weather is Weather  {
//     return(
//         Boolean(weather) && 
//         typeof weather === 'object' &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number'
//     )
// }

export default function useWeather(){

    const fetchWeather = async (search : SearchType) => {

        // Para ocultar el key se crea un archivo .env.local (se ve en la paginad de Vite) para que no se vea desde git, en produccion se agrega en un panel
        // Obtener la variable de entorno
        const appId = import.meta.env.VITE_API_KEY 

        try {
            // Consulta de la API y nos da una URL del JSON
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            // Nos da la respuesta tipo FetchAPI con la informacion, status, etc
            const {data} = await axios(geoUrl)
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            // 1. Castear un valor
            // const {data : weatherResult} = await axios<Weather>(weatherUrl)

            // 2. Type Guards
            // const {data : weatherResult} = await axios(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            // if(result) {
            //     console.log(weatherResult.name)
            // }

        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}