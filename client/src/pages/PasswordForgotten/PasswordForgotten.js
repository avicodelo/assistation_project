//PAGE TO SEND MSG TO RECOVER THE PASSWORD

//CSS imports
import style from "./PasswordForgotten.module.css"

//Component imports
import Navbar from "../../components/Navbar/Navbar"
import { URL_PASSFORGOTTEN } from "../../settings/Settings"

//React imports
import { useState } from "react"


export default function PasswordForgotten() {

  //Const declarations
  const initialState = {
    email: "",
    role: ""
  }

  const [recoverPassData, setRecoverPassData] = useState(initialState);
  const [messageSended, setMessageSended] = useState(false);

  //Function: Manages data introduced by user
  const handleInput = (e) => {
    setRecoverPassData({ ...recoverPassData, ...{ [e.target.name]: e.target.value } });
  }

  //Function: Searches the email with pass forgotten
  const searchEmail = () => {
    return (e) => {
      e.preventDefault();

      //POST DATA
      const dataToSearch = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recoverPassData)
      }

      //Recover Password
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


  /*configurar el envío de correos con NODEMAILER*/

  return (

    <div className={style.passForgottenBody}>
      <Navbar />
      <div className={style["generalDiv-blur"]}>

        <div className={style.passForgottenMain}>
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
                    <label htmlFor="customer"><p>Entrar como Cliente</p></label>
                  </div>
                  <div>
                    <input type="radio" id="provider" name="role" onChange={handleInput} value="PROVIDER" />
                    <label htmlFor="provider"><p>Entrar como Proveedor</p></label>
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
