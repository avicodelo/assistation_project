//PAGE TO RECOVER THE PASSWORD

//CSS imports
import style from "./PasswordForgotten.module.css"

//Component imports
import Navbar from "../../components/Navbar/Navbar"

//React imports
import React from 'react'


export default function PasswordForgotten() {

  /*configurar el envío de correos con NODEMAILER*/ 

  return (

    <div className={style.passForgottenBody}>
      <Navbar />
      <div className={style["generalDiv-blur"]}>

        <div className={style.passForgottenMain}>

          <div className={style.divEmailData}> {/* Div with form to login */}

            <h3>Indicanos tu email y te enviaremos un mensaje con las instrucciones</h3>

            <form className={style.formPassForgotten}>

                <div className={style.emailDiv}>
                  <i className="fa-regular fa-user"></i>
                  <input className={style.controlInput} type="email" name="email" placeholder='Email' required />
                </div>

                <input className={style.submitLogin} type="submit" value="Enviar" />
              

            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
