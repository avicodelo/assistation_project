//CSS imports
import style from "./UserPersonalInfo.module.css";

//React imports
import { useContext, useState } from "react"
import { dashboardContext } from "../../pages/Dashboard/Dashboard"
import { useUpdateInfo } from "../../Hooks/useUpdateInfo";

//Component imports
import { SERVER_HOST, URL_DASHBOARD } from "../../settings/Settings";

//Hook imports
import { useMinAge } from "../../Hooks/useMinAge";

export default function UserPersonalInfo() {

  const userData = useContext(dashboardContext)
  const accessToken = localStorage.getItem("accesstoken")

  const initialUserData = {
    name: "",
    surname: "",
    dateOfBirth: "",
    phone: "",
    nationality: "",
    description: ""
  }

  const [dataUpdated, handleInput, updateInfo, _addItem, _removeItem, activateArea, setActivateArea, userDataUpdated] = useUpdateInfo(initialUserData, userData)
  const minAge = useMinAge()

  const [activateInputFile, setActivateInputFile] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(null)

  const fileHandler = (e) => {
    setFileUploaded(e.target.files[0]);
  }

  const managePhoto = () => {
    return () => {
      if (fileUploaded) {
        const formData = new FormData();
        formData.append("avatarImage", fileUploaded)

        const postData = {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + accessToken
          },
          body: formData
        }

        fetch(`${URL_DASHBOARD}/uploadImage/${userData?._id}`, postData)
          .then(res => res.json)
          .then(fetch(SERVER_HOST + userData.photo)
            .then(res => res.json)
            .then(setActivateInputFile(false)))
          .catch(err => console.log(err))
      }
    }
  }

  return (
    <div className={style.wrapper}>

      {!activateInputFile ?
        <div>
          <img src={SERVER_HOST + userData?.photo} alt="user" className={style.userDataPhoto} />
          <button onClick={() => {
            setActivateInputFile(true)
          }}>Cambiar foto de perfil</button>
        </div> :
        <div>
          <input onChange={fileHandler} type="file" accept="image/png, image/jpeg" />
          <button onClick={managePhoto()}>Aplicar Foto</button>
          <button onClick={() => {
            setActivateInputFile(false)
          }}>Cancelar</button>
        </div>

      }
      <form className={style.mainContainer} onSubmit={updateInfo}>
        <div className={style.infoContainer}>
          <h3>Nombre: </h3>
          {activateArea ?
            <div>
              <input type="text" name="name" onChange={handleInput} value={dataUpdated.name}
                placeholder={userData?.name} pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,3}" maxLength="50" />
              <input type="text" name="surname" onChange={handleInput} value={dataUpdated.surname}
                placeholder={userData?.surname} pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,3}" maxLength="50" />
            </div> :
            <h3>{userDataUpdated.name ? userDataUpdated.name + " " + userDataUpdated.surname : userData?.name + " " + userData?.surname}</h3>
          }
        </div>

        <div className={style.infoContainer}>
          <h3>Fecha de nacimiento</h3>
          {activateArea ?
            <input type="date" name="dateOfBirth" onChange={handleInput} value={dataUpdated.dateOfBirth}
              placeholder={(new Date(userData?.dateOfBirth)).toLocaleDateString()} max={minAge} /> :
            <h3>{userDataUpdated.dateOfBirth ? (new Date(userDataUpdated.dateOfBirth)).toLocaleDateString() : (new Date(userData?.dateOfBirth)).toLocaleDateString()}</h3>
          }
        </div>

        <div className={style.infoContainer}>
          <h3>Teléfono: </h3>
          {activateArea ?
            <input type="text" name="phone" onChange={handleInput} value={dataUpdated.phone}
              placeholder={userData?.phone} pattern="^\+34[0-9]{9}" title="Es necesario añadir +34" /> :
            <h3>{userDataUpdated.phone ? userDataUpdated.phone : userData?.phone}</h3>
          }
        </div>

        <div className={style.infoContainer}>
          <h3>Nacionalidad: </h3>
          {activateArea ?
            <input type="text" name="nationality" onChange={handleInput} value={dataUpdated.nationality}
              placeholder={userData?.nationality} maxLength="50" /> :
            <h3>{userDataUpdated.nationality ? userDataUpdated.nationality : userData?.nationality}</h3>
          }
        </div>

        <div className={style.descriptionContainer}>
          <h3>Sobre ti: </h3>
          {activateArea ?
            <textarea name="description" onChange={handleInput} value={dataUpdated.description}
              placeholder={userData?.description} rows="5" maxLength="2000">
            </textarea> :
            <h3 className={style.descriptionInfo}>{userDataUpdated.description ? userDataUpdated.description : userData?.description}</h3>
          }
        </div>

        {!activateArea ?
          <div>
            <button onClick={(e) => {
              e.preventDefault()
              setActivateArea(true)
            }}>Actualizar</button>
          </div> :
          <div>
            <button onClick={(e) => {
              e.preventDefault()
              setActivateArea(false)
            }}>Cancelar</button>
            <button type="submit">Aplicar cambios</button>
          </div>}

      </form>
    </div>
  )
}
