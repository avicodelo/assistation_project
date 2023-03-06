//LOGIN PAGE

//CSS imports
import style from "./Login.module.css"

//Component imports
import Navbar from "../../components/Navbar/Navbar";
import { URL_LOGIN } from "../../settings/Settings";

//React imports
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"

export default function Login() {

  //Const sets
  const navigate = useNavigate()
  const initialLogState = {
    email: "",
    password: "",
    typeOfUser: ""
  }

  const [loginData, setLoginData] = useState(initialLogState); //login data variable

  //Function: updates customer data
  const handleInput = (e) => {
    setLoginData({ ...loginData, ...{ [e.target.name]: e.target.value } });
  }

  //Function: sends the info to server to do login
  const doLogin = () => {
    return (e) => {
      e.preventDefault()

      //POST DATA
      const checkLoginInfo = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(loginData)
      };

      //Does login
      fetch(URL_LOGIN, checkLoginInfo)
        .then(response => response.json())
        .then(access => {
          const { token } = access
          const { _id, role } = access.userDB;
          if (access.ok) {
            localStorage.setItem("accesstoken", token);
            localStorage.setItem("userID", _id);
            if (role === "PROVIDER") {
              navigate(`/dashboard/${_id}`)
            } else {
              navigate(`/servicesSearcher`)
            }
          }
        });

      e.target.typeOfUser.forEach(element => {
        element.checked = false;
        setLoginData(initialLogState);

      })

      /* Establecer validación si hace match, encriptar passwords, crear token y redirigir */
    };
  };

  return (

    <div className={style.LoginPageBody}>
      <Navbar />

      <div className={style["generalDiv-blur"]}>

        <div className={style.loginMain}>

          <div className={style["login-image"]}> {/* Div with image left */}</div>

          <div className={style.divLoginData}> {/* Div with form to login */}

            <h2>BIENVENID@ !</h2>

            <form className={style.formLoginData} onSubmit={doLogin()}>

              <fieldset className={style.inputGroup}>

                <div className={style.userData}>

                  <i className="fa-regular fa-user"></i>
                  <input className={style.controlInput} onChange={handleInput} value={loginData.email} type="email" name="email" placeholder='Email' required />

                </div>

                <div className={style.userData}>

                  <i className="fa-solid fa-lock"></i>
                  <input className={style.controlInput} onChange={handleInput} value={loginData.password} type="password" name="password" pattern=".{6,16}" placeholder='Contraseña' required />

                </div>

                <div className={style.typeOfUser}>

                  <div>
                    <input type="radio" id="customer" name="typeOfUser" onChange={handleInput} value="CUSTOMER" required />
                    <label htmlFor="customer"><p>Entrar como Cliente</p></label>
                  </div>
                  <div>
                    <input type="radio" id="provider" name="typeOfUser" onChange={handleInput} value="PROVIDER" />
                    <label htmlFor="provider"><p>Entrar como Proveedor</p></label>
                  </div>

                </div>

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
