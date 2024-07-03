
import styles from "./App.module.css"
import Form from "./components/Form/Form"
import useWeather from "./hooks/useWeather"

function App() {

  const {fetchWeather} = useWeather()
  // Consultar las variables de entorno
  // console.log(import.meta.env)

  return (
    <>
     <h1 className={styles.title}>Buscador de Clima</h1>

     <div className={styles.container}>
      <Form
        fetchWeather={fetchWeather}
      />
      <p>2</p>
     </div>
    </>
  )
}

export default App
