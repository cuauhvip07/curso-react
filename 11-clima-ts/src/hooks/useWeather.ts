
import axios from "axios"
import {object, z} from 'Zod'
import { SearchType } from "../types"


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

// 3. Zod

const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

type Weather = z.infer<typeof Weather>


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

            // 3. Zod

            const {data : weatherResult} = await axios<Weather>(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            
            if(result.success){
                console.log(result.data.main.temp)
            }


        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}