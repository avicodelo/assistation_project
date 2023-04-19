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
          <h4>Email: </h4>
          <h4>{userData.email}</h4>
        </div>
        {!activateArea ?
          <button className={style.btnChange} onClick={(e) => {
            e.preventDefault()
            setActivateArea(true)
          }}>Cambiar contraseña</button> :
          <div className={style.passwordsWrapper}>
            <div>
              <h4>Confirma la contraseña anterior: </h4>
              <input type="password" name="oldPass" onChange={handleInput} value={dataUpdated.oldPass} maxLength="16" />
            </div>

            <div>
              <h4>Introduce la nueva contraseña: </h4>
              <input type="password" name="password" onChange={handleInput} value={dataUpdated.password} maxLength="16"/>
            </div>
            {!validator && <p>Las contraseñas no coinciden</p>}
            <div>
              <h4>Repite la nueva contraseña: </h4>
              <input type="password" name="checkNewPass" onChange={handleInput} value={dataUpdated.checkNewPass} maxLength="16"/>
            </div>
            <div>
              <button className={style.btnChange} type="submit">Actualizar</button>
              <button className={style.btnChange} onClick={(e) => {
                e.preventDefault()
                setActivateArea(false)
              }}>Cancelar</button>

            </div>
          </div>
        }

      </form >

    </div >
  )
}
