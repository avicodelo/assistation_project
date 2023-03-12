//CSS imports
import style from "./UserSecurity.module.css";

//Component imports
import { URL_LOGIN } from "../../settings/Settings";

//React imports
import { useContext, useState } from "react";
import { dashboardContext } from "../../pages/Dashboard/Dashboard";

//Hook imports
import { useUpdateInfo } from "../../Hooks/useUpdateInfo";

export default function UserSecurity() {

  const initialPassState = {
    oldPass: "",
    password: "",
    checkNewPass: ""
  }

  const userData = useContext(dashboardContext);
  const accessToken = localStorage.getItem("accesstoken")
  const [validator, setValidator] = useState(true);
  const [dataUpdated, handleInput, updateInfo, _addItem, _removeItem, activateArea, setActivateArea] = useUpdateInfo(initialPassState, userData)

  const changePassword = () => {
    return (e) => {
      e.preventDefault()
      if (dataUpdated.password !== dataUpdated.checkNewPass) {
        setValidator(false)
      } else {
        setValidator(true)

        const checkPass = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
          },
          body: JSON.stringify({
            email: userData.email,
            password: dataUpdated.oldPass,
            role: userData.role
          })
        };

        fetch(URL_LOGIN, checkPass)
          .then(response => response.json())
          .then(access => {
            if (access.ok) {
             updateInfo(e)
            }
          })
      }
    }
  }

  return (
    <div className={style.wrapper}>
      <form className={style.mainContainer} onSubmit={changePassword()}>

        <div className={style.infoContainer}>
          <h3>Email: </h3>
          <h3>{userData.email}</h3>
        </div>
        {!activateArea ?
          <button className={style.changePassContainer} onClick={(e) => {
            e.preventDefault()
            setActivateArea(true)
          }}><p>Cambiar contraseña</p></button> :
          <div className="">
            <div>
              <p>Confirma la contraseña anterior: </p>
              <input type="password" name="oldPass" onChange={handleInput} value={dataUpdated.oldPass} />
            </div>

            <div>
              <p>Introduce la nueva contraseña: </p>
              <input type="password" name="password" onChange={handleInput} value={dataUpdated.password} />
            </div>
            {!validator && <p>Las contraseñas no coinciden</p>}
            <div>
              <p>Repite la nueva contraseña: </p>
              <input type="password" name="checkNewPass" onChange={handleInput} value={dataUpdated.checkNewPass} />
            </div>
            <div>
              <button onClick={(e) => {
                e.preventDefault()
                setActivateArea(false)
              }}>Cancelar</button>
              <button type="submit">Actualizar</button>
            </div>
          </div>
        }

      </form >

    </div >
  )
}
