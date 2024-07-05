
import axios from "axios"
import {object, z} from 'Zod'
// import {object,string,number, Output, parse} from 'valibot'
import { SearchType } from "../types"
import { useMemo, useState } from "react"


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

export type Weather = z.infer<typeof Weather>

// 4. Valibot

// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
//     })
// })
// export type Weather = Output<typeof WeatherSchema>

export default function useWeather(){

    const [weather, setWeather] = useState<Weather>({
        name:'',
        main: {
            temp:0,
            temp_max:0,
            temp_min:0
        }
    })

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

            // 3. Zod -> NO es modular, pesa mas

            const {data : weatherResult} = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            
            if(result.success){
                setWeather(result.data)
            }else{
                console.log('Rspuesta mal formada')
            }

            // 4. Valibot
            // const {data : weatherResult} = await axios(weatherUrl)
            // const result = parse(WeatherSchema , weatherResult)
            // // Agrgando la informacion al state
            // if(result){
            //     console.log(result)
            // }else{
            //     console.log('Respuesta mal formada')
            // }



        } catch (error) {
            console.log(error)
        }
    }

    const hasWeatherData = useMemo(() => weather.name ,[weather])

    return {
        weather,
        fetchWeather,
        hasWeatherData
    }
}