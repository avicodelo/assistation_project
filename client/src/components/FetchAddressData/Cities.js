//Component imports
import { URL_PROVINCIAS } from "../../settings/Settings"

//React imports
import { useState, useEffect } from "react"

export default function Cities(cp) {

  const [cities, setCities] = useState([])

  useEffect(() => {
    if (cp.length === 2) {
      fetch(URL_PROVINCIAS(cp))
        .then(res => res.json())
        .then(results => {
          setCities(results.records[0].fields.prov_name_local ? results.records[0]?.fields.prov_name_local : results.records[0]?.fields.prov_name)
        })
    }
  }, [cp])

  return cities ? cities : "";


}

