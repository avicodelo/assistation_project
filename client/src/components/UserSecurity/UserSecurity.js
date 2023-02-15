//CSS imports
import style from "./UserSecurity.module.css";

//React imports
import { useContext } from "react";
import { dashboardContext } from "../../pages/Dashboard/Dashboard";

export default function UserSecurity() {
  const userData = useContext(dashboardContext);

  return (
    <div className={style.wrapper}>
      <div className={style.mainContainer}>

        <div className={style.infoContainer}>
          <h3>Email: </h3>
          <h3>{userData.email}</h3>
        </div>

        <button className={style.changePassContainer}><p>Cambiar contraseña</p></button>

      </div>

    </div>
  )
}
