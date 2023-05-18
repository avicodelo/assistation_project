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
    role: ""
  }

  const [loginData, setLoginData] = useState(initialLogState); //login data variable
  const [allowAccess, setAllowAccess] = useState(true)

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
        .then(response => {
          if (response.status === "500") {
            throw new Error("Ha habido un problema con el servidor")
          } else {
            return response.json()
          }
        })
        .then(access => {
          if (!access.ok) {
            setAllowAccess(false)
          }
          else {
            const { token } = access
            const { _id, role } = access.userDB;
            localStorage.setItem("accesstoken", token);
            localStorage.setItem("userID", _id);
            if (role === "PROVIDER") {
              navigate(`/dashboard/${_id}`)
            } else {
              navigate(`/servicesSearcher`)
            }
          }
        });

      e.target.role.forEach(element => {
        element.checked = false;
        setLoginData(initialLogState);

      })

    };
  };

  return (

    <div className={style.LoginPageBody}>

      <Navbar />
      <div className={style["generalDiv-blur"]}>

        <div className={style.loginMain}>

          <div className={style["login-image"]}> {/* Div with image left */}</div>

          <div className={style.divLoginData}> {/* Div with form to login */}

            <h2>ÁREA PERSONAL</h2>

            <form className={style.formLoginData} onSubmit={doLogin()}>

              <fieldset className={style.inputGroup}>

                <p className={allowAccess ? style.hide : style.redLabel}>
                  El usuario y/o la contraseña no son correctos
                </p>

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
                    <input type="radio" id="customer" name="role" onChange={handleInput} value="CUSTOMER" required />
                    <label htmlFor="customer"><p>Entrar como Cliente</p></label>
                  </div>
                  <div>
                    <input type="radio" id="provider" name="role" onChange={handleInput} value="PROVIDER" />
                    <label htmlFor="provider"><p>Entrar como Proveedor</p></label>
                  </div>

                </div>

              </fieldset>

              <div className={style.submitArea}>

                <input className={style.submitLogin} type="submit" value="ENTRAR" />
                <NavLink className={style.passForgotten} to="passwordForgotten">¿Contraseña olvidada?</NavLink>

              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  )
}
