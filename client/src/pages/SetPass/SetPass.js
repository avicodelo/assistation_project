//PAGE TO SET NEW PASSWORD

//CSS import
import style from "./SetPass.module.css";

//Component imports
import Navbar from "../../components/Navbar/Navbar"

//React imports
import { useState } from "react";
import { useParams } from "react-router-dom"

//Hook imports
import { useUpdateInfo } from "../../Hooks/useUpdateInfo";

export default function SetPass() {

  const initialPassState = {
    email: "",
    code: "",
    password: "",
    checkNewPass: ""
  }

  const {role} = useParams()
  const [passData, setPassData] = useState(initialPassState);
  const [validator, setValidator] = useState(true);

  const handleInput = (e) => {
    setPassData({ ...passData, ...{ [e.target.name]: e.target.value } })
  }

  const changePassword = () => {
    return (e) => {
      e.preventDefault()
      if (passData.password !== passData.checkNewPass) {
        setValidator(false)
      } else {
        setValidator(true)

        const checkPass = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passData)

        };

        /* fetch(URL_LOGIN, checkPass)
        .then(response => response.json())
        .then(access => {
          if (access.ok) {
            updateInfo(e)
          }
        }) */
      }
    }
  }

  return (
    <div className={style.passForgottenBody}>
      <Navbar />
      <div className={style["generalDiv-blur"]}>

        <div className={style.passForgottenMain}>
          <div className={style.divEmailData}> {/* Div with form to login */}

            <form className={style.formPassForgotten} onSubmit={changePassword()}>

              <div className={style.passDataDiv}>
                <h4>Confirma tu email: </h4>
                <input className={style.controlInput} type="email" name="email" onChange={handleInput} value={passData.email} maxLength="50" placeholder='Email' required />
              </div>

              <div className={style.passDataDiv}>
                <h4>Código de activación: </h4>
                <input className={style.controlInput} type="text" name="code" onChange={handleInput} value={passData.code} pattern="\d{6}" placeholder='Código de activación' required />
              </div>

              {!validator && <p>Las contraseñas no coinciden</p>}
              <div className={style.passDataDiv}>
                <h4>Introduce la contraseña: </h4>
                <input className={style.controlInput} type="password" name="password" onChange={handleInput} value={passData.password} maxLength="16" placeholder='Contraseña nueva' required/>
              </div>
              <div className={style.passDataDiv}>
                <h4>Repite la contraseña: </h4>
                <input className={style.controlInput} type="password" name="checkNewPass" onChange={handleInput} value={passData.checkNewPass} maxLength="16" placeholder='Repita contraseña' required/>
              </div>

              <button className={style.stdBtn} type="submit">Actualizar</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
