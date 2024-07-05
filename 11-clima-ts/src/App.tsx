
import styles from "./App.module.css"
import Form from "./components/Form/Form"
import Spinner from "./components/Spinner/Spinner"
import WeatherDetail from "./components/WeatherDetail/WeatherDetail"
import useWeather from "./hooks/useWeather"

function App() {

  const {weather,loading,hasWeatherData,fetchWeather} = useWeather()
  // Consultar las variables de entorno
  // console.log(import.meta.env)

  return (
    <>
     <h1 className={styles.title}>Buscador de Clima</h1>

     <div className={styles.container}>
      <Form
        fetchWeather={fetchWeather}
      />
      
      {loading && <Spinner/>}

      {hasWeatherData && <WeatherDetail weather={weather}/>}
      
     </div>
    </>
  )
}

export default App
