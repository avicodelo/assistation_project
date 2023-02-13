//PAGE TO RECOVER THE PASSWORD

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
    typeOfUser: ""
  }

  const [recoverPassData, setRecoverPassData] = useState(initialState);

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
        .then(access => {
          console.log(access)
          e.target.typeOfUser.forEach(element => {
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

          <div className={style.divEmailData}> {/* Div with form to login */}

            <h3>Indicanos tu email y te enviaremos un mensaje con las instrucciones</h3>

            <form className={style.formPassForgotten} onSubmit={searchEmail()}>

              <div className={style.emailDiv}>
                <i className="fa-regular fa-user"></i>
                <input className={style.controlInput} type="email" name="email" onChange={handleInput} value={recoverPassData.email} maxLength="100" placeholder='Email' required />
              </div>

              <div className={style.typeOfUser}>

                <div>
                  <input type="radio" id="customer" name="typeOfUser" onChange={handleInput} value="customer" required />
                  <label htmlFor="customer"><p>Entrar como Cliente</p></label>
                </div>
                <div>
                  <input type="radio" id="provider" name="typeOfUser" onChange={handleInput} value="provider" />
                  <label htmlFor="provider"><p>Entrar como Proveedor</p></label>
                </div>

              </div>

              <input className={style.submitLogin} type="submit" value="Enviar" />


            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
