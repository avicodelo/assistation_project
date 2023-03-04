//CSS imports
import style from "./UserPersonalInfo.module.css";

//React imports
import { useContext, useState } from "react"
import { dashboardContext } from "../../pages/Dashboard/Dashboard"
import { useUpdateInfo } from "../../Hooks/useUpdateInfo";

//Hook imports
import { useMinAge } from "../../Hooks/useMinAge";

export default function UserPersonalInfo() {

  const initialUserData = {
    name: "",
    surname: "",
    dateOfBirth: "",
    phone: "",
    nationality: "",
    description: ""
  }
  const userData = useContext(dashboardContext)
  const [denyUpdate, setDenyUpdate] = useState(true)
  const [dataUpdated, handleInput, updateInfo] = useUpdateInfo(initialUserData)
  const minAge = useMinAge()

  return (
    <div className={style.wrapper}>
      <div className={style.mainContainer}>
        <img src={userData.photo} alt="user" className={style.userDataPhoto} />
        <div className={style.infoContainer}>
          <h3>Nombre: </h3>
          {!denyUpdate ?
            <input type="text" name="name" onChange={handleInput} value={dataUpdated.name}
              placeholder={userData.name} pattern="([a-zA-Z]*\s?){1,3}" maxLength="50" /> :
            <h3>{userData.name + " " + userData.surname}</h3>
          }
        </div>

        <div className={style.infoContainer}>
          <h3>Fecha de nacimiento</h3>
          {!denyUpdate ?
            <input type="date" name="dateOfBirth" onChange={handleInput} value={dataUpdated.dateOfBirth}
              placeholder={(new Date(userData.dateOfBirth)).toLocaleDateString()} max={minAge} /> :
            <h3>{(new Date(userData.dateOfBirth)).toLocaleDateString()}</h3>
          }
        </div>

        <div className={style.infoContainer}>
          <h3>Teléfono: </h3>
          {!denyUpdate ?
            <input type="text" name="phone" onChange={handleInput} value={dataUpdated.phone}
              placeholder={userData.phone} pattern="^\+34[0-9]{9}" /> :
            <h3>{userData.phone}</h3>
          }
        </div>

        <div className={style.infoContainer}>
          <h3>Nacionalidad: </h3>
          {!denyUpdate ?
            <input type="text" name="nationality" onChange={handleInput} value={dataUpdated.nationality}
              placeholder={userData.nationality} maxLength="50" /> :
            <h3>{userData.nationality}</h3>
          }
        </div>

        <div className={style.descriptionContainer}>
          <h3>Sobre ti: </h3>
          {!denyUpdate ?
            <textarea name="description" onChange={handleInput} value={dataUpdated.description}
              placeholder={userData.description} rows="5" maxLength="2000">
            </textarea> :
            <h3 className={style.descriptionInfo}>{userData.description}</h3>
          }
        </div>

        {denyUpdate ?
          <div><button onClick={() => setDenyUpdate(false)}>Actualizar</button></div> :
          <div>
            <button onClick={() => setDenyUpdate(true)}>Cancelar</button>
            <button onClick={updateInfo}>Aplicar cambios</button>
          </div>}

      </div>
    </div>
  )
}
