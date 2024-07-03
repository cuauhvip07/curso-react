import { countries } from "../../data/countries";




export default function Form() {
  return (
    <form action="">
        <div>
            <label htmlFor="city">Ciudad</label>
            <input 
                type="text" 
                id="city"
                name="city"
                placeholder="Ciudad"
            />
        </div>

        <div>
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

        <input type="submit" value="Consultar Clima"/>
    </form>
  )
}
