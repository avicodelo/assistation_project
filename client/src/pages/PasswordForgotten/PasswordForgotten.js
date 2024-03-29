//PAGE THAT SENDS A MSG TO RECOVER THE PASSWORD

//CSS imports
import style from "./PasswordForgotten.module.css"

//Component imports
import Navbar from "../../components/Navbar/Navbar"
import { URL_PASSFORGOTTEN } from "../../settings/Settings"

//React imports
import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function PasswordForgotten() {

  //Const settings
  const initialState = {
    email: "",
    role: ""
  }
  const [recoverPassData, setRecoverPassData] = useState(initialState);
  const [messageSended, setMessageSended] = useState(false);

  //Manages data introduced by user
  const handleInput = (e) => {
    setRecoverPassData({ ...recoverPassData, ...{ [e.target.name]: e.target.value } });
  }

  //Searches the email with pass forgotten
  const searchEmail = () => {
    return (e) => {
      e.preventDefault();

      //POST DATA
      const dataToSearch = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recoverPassData)
      }

      //Sends a message to recover password
      fetch(URL_PASSFORGOTTEN, dataToSearch)
        .then(response => response.json())
        .then(({ message }) => {
          message && setMessageSended(message[0])
          e.target.role.forEach(element => {
            element.checked = false;
          });
          setRecoverPassData(initialState);
        })
    }
  }

  return (

    <div className={style.passForgottenBody}>
      <Navbar />
      <div className={style["generalDiv-blur"]}>

        <div className={style.passForgottenMain}>
          <div>
          <NavLink to="/login"><i className={`fa-solid fa-circle-arrow-left ${style.prevArrow}`}></i></NavLink>
          </div>

          {!messageSended ?

            <div className={style.divEmailData}> {/* Div with form to login */}



              <h3>Indicanos tu email y te enviaremos un mensaje con las instrucciones</h3>

              <form className={style.formPassForgotten} onSubmit={searchEmail()}>

                <div className={style.emailDiv}>
                  <i className="fa-regular fa-user"></i>
                  <input className={style.controlInput} type="email" name="email" onChange={handleInput} value={recoverPassData.email} maxLength="50" placeholder='Email' required />
                </div>

                <div className={style.typeOfUser}>

                  <div>
                    <input type="radio" id="customer" name="role" onChange={handleInput} value="CUSTOMER" required />
                    <label htmlFor="customer"><p>Soy Cliente</p></label>
                  </div>
                  <div>
                    <input type="radio" id="provider" name="role" onChange={handleInput} value="PROVIDER" />
                    <label htmlFor="provider"><p>Soy Proveedor</p></label>
                  </div>

                </div>

                <input className={style.submitLogin} type="submit" value="Enviar" />

              </form>
            </div> :
            <div className={style.msgSended}>
              <h3>Se ha enviado un mensaje a "{messageSended}" con las instrucciones para recuperar
                la contraseña. Por favor, revise su bandeja de entrada. En caso de no haberlo recibido, revise
                la carpeta de SPAM.</h3>
            </div>
          }
        </div>
      </div>
    </div>

  )
}
