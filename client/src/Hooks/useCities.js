//Component imports
import { URL_PROVINCIAS } from "../settings/Settings"

//React imports
import { useState, useEffect } from "react"

function useCities(cp) {

  const [city, setCities] = useState("")
  const postalCode = cp >= 2 ? cp.substring(0, 2) : "";

  useEffect(() => {
    if (postalCode.length === 2 && postalCode !== "54") {
      fetch(URL_PROVINCIAS(postalCode))
        .then(res => res.json())
        .then(results => {
          setCities(results.records[0].fields.prov_name_local ? results.records[0]?.fields.prov_name_local : results.records[0]?.fields.prov_name)
        })
    } else{setCities("")}
  }, [postalCode])

  return city;

}

export { useCities }