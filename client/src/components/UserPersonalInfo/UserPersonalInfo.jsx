//SHOWS USER'S PERSONAL INFO

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

  //Const settings
  const userData = useContext(dashboardContext)
  const initialUserData = {
    name: "",
    surname: "",
    dateOfBirth: "",
    phone: "",
    nationality: "",
    description: ""
  }
  const accessToken = localStorage.getItem("accesstoken")
  const minAge = useMinAge()
  const [activateInputFile, setActivateInputFile] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(null)

  //Hook that manages the user data
  const [dataUpdated, handleInput, updateInfo, _addItem, _removeItem, activateArea, setActivateArea, userDataUpdated] = useUpdateInfo(initialUserData, userData)

  //Saves the file uploaded
  const fileHandler = (e) => {
    setFileUploaded(e.target.files[0]);
  }

  //Manage the image data to save it in DDBB
  const managePhoto = () => {
    return () => {
      if (fileUploaded) {
        const formData = new FormData();
        formData.append("avatarImage", fileUploaded)

        //POST data
        const postData = {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + accessToken
          },
          body: formData
        }

        //Sends the image data to API REST
        fetch(`${URL_DASHBOARD}/uploadImage/${userData?._id}`, postData)
          .then(res => res.json)
          .then(fetch(SERVER_HOST + userData.photo)
            .then(res => res.json)
            .then(() => {
              setActivateInputFile(false);
              window.location.reload()
            }
            ))
      }
    }
  }

  return (
    <div className={style.wrapper}>

      {!activateInputFile ?
        <div className={style.imageContainer}>
          <img src={SERVER_HOST + userData?.photo} alt="user" className={style.userDataPhoto} />
          <button onClick={() => { setActivateInputFile(true) }} className={style.btnChange}>
            Cambiar foto de perfil
          </button>
        </div> :
        <div className={style.imageContainer}>

          <img src={SERVER_HOST + userData?.photo} alt="user" className={style.userDataPhoto} />
          <input id="changePhoto" onChange={fileHandler} type="file" accept="image/png, image/jpeg" />
          <label  htmlFor="changePhoto">
            <span className={style.uploadFile}>Examinar...</span>
            <span className={style.fileName} >{fileUploaded ? fileUploaded.name : "Archivo seleccionado"}</span>
          </label>

          <div>
            <button onClick={managePhoto()} className={style.btnChange}>Aplicar Foto</button>
            <button onClick={() => {
              setActivateInputFile(false)
            }} className={style.btnChange}>Cancelar</button>
          </div>
        </div>

      }
      <form className={style.mainContainer} onSubmit={updateInfo}>
        <div className={style.infoContainer}>
          <h4>Nombre: </h4>
          {activateArea ?
            <div>
              <input type="text" name="name" onChange={handleInput} value={dataUpdated.name}
                placeholder={userDataUpdated.name ? userDataUpdated.name : userData?.name} pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,3}" maxLength="50" />
              <input type="text" name="surname" onChange={handleInput} value={dataUpdated.surname}
                placeholder={userDataUpdated.surname ? userDataUpdated.surname : userData?.surname} pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,3}" maxLength="50" />
            </div> :
            <h4>{userDataUpdated.name ? userDataUpdated.name + " " + userDataUpdated.surname : userData?.name + " " + userData?.surname}</h4>
          }
        </div>

        <div className={style.infoContainer}>
          <h4>Fecha de nacimiento:</h4>
          {activateArea ?
            <input type="date" name="dateOfBirth" onChange={handleInput} value={dataUpdated.dateOfBirth}
              placeholder={userDataUpdated.dateOfBirth ? (new Date(userDataUpdated.dateOfBirth)).toLocaleDateString() : (new Date(userData?.dateOfBirth)).toLocaleDateString()} max={minAge} /> :
            <h4>{userDataUpdated.dateOfBirth ? (new Date(userDataUpdated.dateOfBirth)).toLocaleDateString() : (new Date(userData?.dateOfBirth)).toLocaleDateString()}</h4>
          }
        </div>

        <div className={style.infoContainer}>
          <h4>Teléfono: </h4>
          {activateArea ?
            <input type="text" name="phone" onChange={handleInput} value={dataUpdated.phone}
              placeholder={userDataUpdated.phone ? userDataUpdated.phone : userData?.phone} pattern="^\+34[0-9]{9}" title="Es necesario añadir +34" /> :
            <h4>{userDataUpdated.phone ? userDataUpdated.phone : userData?.phone}</h4>
          }
        </div>

        <div className={style.infoContainer}>
          <h4>Nacionalidad: </h4>
          {activateArea ?
            <input type="text" name="nationality" onChange={handleInput} value={dataUpdated.nationality}
              placeholder={userDataUpdated.nationality ? userDataUpdated.nationality : userData?.nationality} maxLength="50" /> :
            <h4>{userDataUpdated.nationality ? userDataUpdated.nationality : userData?.nationality}</h4>
          }
        </div>

        <div className={style.descriptionContainer}>
          <h4>Sobre ti: </h4>
          {activateArea ?
            <textarea name="description" onChange={handleInput} value={dataUpdated.description}
              placeholder={userDataUpdated.description ? userDataUpdated.description : userData?.description} rows="5" cols="50" maxLength="2000">
            </textarea> :
            <p className={style.descriptionInfo}>{userDataUpdated.description ? userDataUpdated.description : userData?.description}</p>
          }
        </div>

        {!activateArea ?
          <div>
            <button onClick={(e) => {
              e.preventDefault()
              setActivateArea(true)
            }} className={style.btnChange}>Actualizar</button>
          </div> :
          <div>
            <button type="submit" className={style.btnChange}>Aplicar cambios</button>
            <button onClick={(e) => {
              e.preventDefault()
              setActivateArea(false)
            }} className={style.btnChange}>
              Cancelar
            </button>

          </div>}

      </form>
    </div>
  )
}
