//CSS imports
import style from "./Login.module.css"

//Component imports
import Navbar from "../../components/Navbar/Navbar"

//React imports
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate();
  const initialLogState = {
    email: "",
    password: ""
  }

  const [loginData, setLoginData] = useState(initialLogState);


  const handleImput = (e) => {
    setLoginData({ ...loginData, ...{ [e.target.name]: e.target.value } });
  }

  const doLogin = () => {
    return (e) => {
      e.preventDefault()
      console.log(loginData); /* Introducir comparación con el backend: buscar match con correo y match con password */
      setLoginData(initialLogState);
      navigate("/")/* Establecer validación si hace match y redirigir */
    }
  }
  return (

    <div className={style.LoginPageBody}>
      <Navbar />
      <div className={style["generalDiv-blur"]}>

        <div className={style.loginMain}>

          <div className={style["login-image"]}> {/* Div with image left */}
          </div>

          <div className={style.divLoginData}> {/* Div with form to login */}

            <h2>BIENVENID@ !</h2>

            <form className={style.formLoginData} onSubmit={doLogin()}>

              <fieldset className={style.inputGroup}>

                <div className={style.emailDiv}>
                  <i className="fa-regular fa-user"></i>
                  <input className={style.controlInput} onChange={handleImput} value={loginData.email} type="email" name="email" placeholder='Email' required />
                </div>

                <div className={style.passwordDiv}>
                  <i className="fa-solid fa-lock"></i>
                  <input className={style.controlInput} onChange={handleImput} value={loginData.password} type="password" name="password" placeholder='Password' required />                </div>

              </fieldset>

              <div className={style.submitArea}>
                <NavLink className={style.passForgotten} to="passwordForgotten">¿Contraseña olvidada?</NavLink>
                <input className={style.submitLogin} type="submit" value="ENTRAR" />
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
