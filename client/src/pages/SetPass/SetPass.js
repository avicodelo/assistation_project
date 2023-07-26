//PAGE TO SET NEW PASSWORD

//CSS import
import style from "./SetPass.module.css";

//Component imports
import Navbar from "../../components/Navbar/Navbar"
import { URL_SETPASS } from "../../settings/Settings";

//React imports
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

export default function SetPass() {

  //Const settings
  const initialPassState = {
    email: "",
    code: "",
    password: "",
    checkNewPass: ""
  }
  const navigate = useNavigate();
  const { userRole } = useParams();
  const role = userRole === "ctm" ? "CUSTOMER" : userRole === "prd" ? "PROVIDER" : undefined;
  const [passData, setPassData] = useState(initialPassState);
  const [validator, setValidator] = useState(true);
  const [passError, setPassError] = useState(undefined)

  //Manages user data
  const handleInput = (e) => {
    setPassData({ ...passData, ...{ [e.target.name]: e.target.value } })
  }

  //Checks validators and changes de password
  const changePassword = () => {
    return (e) => {
      e.preventDefault()
      if (passData.password !== passData.checkNewPass) {
        setValidator(false)
      } else {
        setValidator(true)

        //PUT data
        const createPass = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...passData, ...{role: role}})

        };

        //Updates de password
        fetch(URL_SETPASS, createPass)
          .then(response => response.json())
          .then(passChanged => {
            if(!passChanged.ok) {
              setPassError(passChanged.error)
            } else{
              navigate("/login")
            }
          })
      }
    }
  }

  return (
    <div className={style.passForgottenBody}>
      <Navbar />
      <div className={style["generalDiv-blur"]}>

        <div className={style.passForgottenMain}>
          <div className={style.divEmailData}>

            <form className={style.formPassForgotten} onSubmit={changePassword()}>

            {passError && <p>{passError}</p>}

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
                <input className={style.controlInput} type="password" name="password" onChange={handleInput} value={passData.password} minLength="6" maxLength="16" placeholder='Contraseña nueva' required />
              </div>
              <div className={style.passDataDiv}>
                <h4>Repite la contraseña: </h4>
                <input className={style.controlInput} type="password" name="checkNewPass" onChange={handleInput} value={passData.checkNewPass} maxLength="16" placeholder='Repita contraseña' required />
              </div>

              <button className={style.stdBtn} type="submit">Actualizar</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
