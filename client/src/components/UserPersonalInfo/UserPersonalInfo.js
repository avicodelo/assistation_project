//CSS imports
import style from "./UserPersonalInfo.module.css";

//React imports
import { useContext } from "react"
import { dashboardContext } from "../../pages/Dashboard/Dashboard"

export default function UserPersonalInfo() {
  const userData = useContext(dashboardContext)

  return (
    <div className={style.wrapper}>
      <div className={style.mainContainer}>
        <img src={userData.photo} alt="user" />
        <div className={style.infoContainer}>
          <h3>Nombre: </h3>
          <h3>{userData.name + " " + userData.surname}</h3>
        </div>
        <div className={style.infoContainer}>
          <h3>Fecha de nacimiento</h3>
          <h3>{(new Date(userData.dateOfBirth)).toLocaleDateString()}</h3>
        </div>
        <div className={style.infoContainer}>
          <h3>Teléfono: </h3>
          <h3>{userData.phone}</h3>
        </div>
        <div className={style.infoContainer}>
          <h3>Nacionalidad: </h3>
          <h3>{userData.nationality}</h3>
        </div>
        <div className={style.descriptionContainer}>
          <h3>Sobre ti: </h3>
          <h3 className={style.descriptionInfo}>{userData.description}</h3>
        </div>

      </div>
    </div>
  )
}
