import { countries } from "../../data/countries"
import styles from './Form.module.css'


export default function Form() {
  return (
    <form className={styles.form}>
        <div className={styles.field}>
            <label htmlFor="city">Ciudad</label>
            <input 
                type="text" 
                id="city"
                name="city"
                placeholder="Ciudad"
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="country">Pais</label>
            <select name="country" id="country">
                <option value="">-- Seleccione un País --</option>
                {countries.map(country => (
                    <option 
                    value={country.code}
                    key={country.code}
                    >
                        {country.name}
                    </option>
                ))}
            </select>
        </div>

        <input type="submit" value="Consultar Clima" className={styles.submit}/>
    </form>
  )
}
