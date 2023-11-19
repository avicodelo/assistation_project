//MANAGES THE SPAIN MUNICIPALITIES TO BE USED IN OTHERS PAGES

//Component imports
import { URL_MUNICIPIOS } from "../../settings/Settings"

//React imports
import { useState, useEffect } from "react"

export default function Municipalities({ cp }) {

  //Const settings
  const [municipalities, setMunicipalities] = useState([])

  //Uses an external API to get Spain municipalities that are set in alphabetical order
  useEffect(() => {
    fetch(URL_MUNICIPIOS(cp))
      .then(res => res.json())
      .then(results => {
        const municipalitiesOrdered = results.records.sort((a, b) => {
          if (a.fields.mun_name > b.fields.mun_name) {
            return 1;
          }
          if (a.fields.mun_name < b.fields.mun_name) {
            return -1;
          }
          return 0;
        })
        setMunicipalities(municipalitiesOrdered)

      })
  }, [cp])




  return (
    <datalist id="municipalities">
      <option value="" hidden>Seleccione el municipio</option>

      {municipalities.map(({ recordid, fields }) => {
        return (
          <option key={recordid} value={fields.mun_name}>
            {fields.mun_name}
          </option>
        )
      }
      )}

    </datalist>
  )
}


