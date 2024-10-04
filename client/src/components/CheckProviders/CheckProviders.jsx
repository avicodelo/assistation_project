import style from "./CheckProviders.module.css"

import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCities } from "../../Hooks/useCities";
import { URL_PROVIDER, URL_SAVEEMAIL } from "../../settings/Settings";

export default function CheckProviders() {

  const initialState = {
    email: "",
    postalCode: "",
    city: ""
  }


  const navigate = useNavigate()
  const [userData, setUserData] = useState(initialState)
  const [checkCP, setCheckCP] = useState(false)
  const [entriesReceived, setEntriesReceived] = useState(0)
  const [emailSaved, setEmailSaved] = useState(false)
  const city = useCities(userData.postalCode);

  const handleInput = (e) => {
    setUserData({ ...userData, ...{ [e.target.name]: e.target.value.toLowerCase() } })
  }

  console.log(userData);

  const getProviders = () => {
    return (e) => {
      e.preventDefault()
      //Fills the card variable with the filtered user info
      fetch(URL_PROVIDER + `?address.city=${city}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Hay problemas con la información " + response.statusText);
        })
        .then(({ totalEntries }) => {
          setEntriesReceived(totalEntries);
          setUserData({ ...userData, city: city })
          setCheckCP(true)
        })
        .catch(() => {
          console.log("Ha habido un error")
        });
    }
  }

  const saveEmail = () => {
    return (e) => {
      e.preventDefault()
      //POST data
      const postInfo = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      }

      fetch(URL_SAVEEMAIL, postInfo)
        .then(res => res.json)
        .then(
          setEmailSaved(true)
        )
    }
  }

  if (!checkCP) {
    return (
      <div>
        <h2 className={style.noLoginTitle}>
          Necesitamos saber tu Código Postal para encontrar profesionales en tu zona
        </h2>
        <form onSubmit={getProviders()}>
          <input type="number" name="postalCode" onChange={handleInput} value={userData.postalCode}
            max="52999" min="01000" placeholder="Código Postal" autoComplete="false" required />
          <input type="submit" value="Buscar" />
        </form>
      </div>
    )
  }

  else if (entriesReceived) {
    return (
      <>
        <div className={style.actionWrapper}>
          <h1 className={style.noLoginTitle}>
            Es necesario Iniciar Sesión como cliente
          </h1>
          <button onClick={() => { navigate("/login") }} className={style.goToLogin}>
            Iniciar sesión
          </button>
        </div>
      </>
    )
  } else {
    return (
      <>
        {
          !emailSaved ?
            <>
              < h2 className={style.noLoginTitle} >
                Todavía no tenemos profesionales en tu ciudad. Indícanos tu mejor Email para que
                te avisemos cuando aparezcan.
              </h2 >
              <form onSubmit={saveEmail()}>
                <input type="email" name="email" onChange={handleInput} value={userData.email}
                  placeholder="Correo electrónico" autoComplete="false" required />
                <input type="submit" value="Enviar" />
              </form>
            </>
            :
            <>
              < h2 className={style.noLoginTitle} >
                Tu email se ha guardado correctamente. Gracias por confiar en nosotros.
              </h2 >
            </>
        }

      </>
    )
  }
}
