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
  const [denyUpdate, setDenyUpdate] = useState(true)
  const [validator, setValidator] = useState(true);
  const [dataUpdated, handleInput, updateInfo] = useUpdateInfo(initialPassState)

  const changePassword = () => {
    return () => {
      if (dataUpdated.password !== dataUpdated.checkNewPass) {
        setValidator(false)
      } else {
        setValidator(true)

        const checkPass = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify({
            email: userData.email,
            password: dataUpdated.oldPass,
            typeOfUser: userData.role
          })
        };

        fetch(URL_LOGIN, checkPass)
          .then(response => response.json())
          .then(access => {
            if (access.ok) {
              updateInfo()
            }
          })
      }
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.mainContainer}>

        <div className={style.infoContainer}>
          <h3>Email: </h3>
          <h3>{userData.email}</h3>
        </div>
        {denyUpdate ?
          <button className={style.changePassContainer} onClick={() => setDenyUpdate(false)}><p>Cambiar contraseña</p></button> :
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
              <button onClick={() => setDenyUpdate(true)}>Cancelar</button>
              <button onClick={changePassword()}>Actualizar</button>
            </div>
          </div>
        }

      </div>

    </div>
  )
}
