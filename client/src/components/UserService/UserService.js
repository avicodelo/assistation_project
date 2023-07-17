//SHOWS THE USER'S SERVICE INFORMATION IF HE IS A PROVIDER

//CSS imports
import style from "./UserService.module.css";

//React imports
import { useContext } from "react";
import { dashboardContext } from "../../pages/Dashboard/Dashboard"

//Hook imports
import { useUpdateInfo } from "../../Hooks/useUpdateInfo"

export default function UserService() {

  //Const settings
  const userData = useContext(dashboardContext)
  const serviceInitialState = {
    price: "",
    areaOfResponsibility: userData.areaOfResponsibility,
    setAreaOfResponsibility: ""
  }

  //Hook that manages the user data
  const [dataUpdated, handleInput, updateInfo, addItem, removeItem, activateArea, setActivateArea, userDataUpdated] = useUpdateInfo(serviceInitialState, userData)

  return (
    <div className={style.wrapper} >
      <form className={style.mainContainer} onSubmit={updateInfo}>

        <div className={style.infoContainer}>
          <h4>Servicio que presta: </h4>
          <h4>{userData.typeOfService}</h4>
        </div>

        {userData.price ?
          <div className={style.infoContainer}>
            <h4>Precio: </h4>
            {!activateArea ?

              <h4>{(userDataUpdated.price ? userDataUpdated.price : userData.price) + " €/h"}</h4> :
              <div>
                <input type="number" onChange={handleInput} name="price" value={dataUpdated.price} />
              </div>
            }
          </div> :
          <div className={style.priceContainer}>
            <p className={style.textPrice}>Trabajar gratis es esclavitud, ¡ponle precio a tu servicio!</p>
            <input className={style.setPriceInput} type="number" placeholder="Precio del servicio"
              onChange={handleInput} name="price" value={dataUpdated.price} />
            <button className={style.savePrice} onClick={updateInfo}><p>Guardar</p></button>
          </div>
        }

        {userData.areaOfResponsibility?.length !== 0 ?
          <div className={style.infoContainer}>
            <h4>Desplazamiento a: </h4>
            {!activateArea ?

              <h4>{userDataUpdated.areaOfResponsibility ? userDataUpdated.areaOfResponsibility?.join(", ") : userData.areaOfResponsibility?.join(", ")}</h4>
              :
              <div>
                <input type="text" onChange={handleInput} name="setAreaOfResponsibility" value={dataUpdated.setAreaOfResponsibility} />
                <button className={style.btnChange} onClick={addItem}>Añadir</button>
                {(userData.areaOfResponsibility ? dataUpdated.areaOfResponsibility : userData.areaOfResponsibility).map((value, index) => {
                  return (
                    <div key={index + value}>
                      <h4 ><button className={style.btnDelete} onClick={removeItem} name={index}>X</button> {value + " "} </h4>
                    </div>
                  )
                })}

              </div>
            }
          </div> :
          <div className={style.priceContainer}>
            <p className={style.textPrice}>Deja que los demás sepan por dónde te mueves. Indica los municipios en los que trabajas</p>
            <input type="text" onChange={handleInput} name="setAreaOfResponsibility" value={dataUpdated.setAreaOfResponsibility} />
            <button className={style.btnChange} onClick={addItem}>Añadir</button>
            {dataUpdated.areaOfResponsibility.map((value, index) => {
              return (
                <div key={index + value}>
                  <p >{value + " "} <button className={style.btnChange} onClick={removeItem} name={index}>X</button></p>
                </div>
              )
            })}

          </div>
        }
        {!activateArea ?
          <div><button className={style.btnChange} onClick={(e) => {
            e.preventDefault()
            setActivateArea(true)
          }}>Actualizar</button></div> :
          <div>
            <button className={style.btnChange} type="submit">Aplicar cambios</button>
            <button className={style.btnChange} onClick={(e) => {
              e.preventDefault()
              setActivateArea(false)
            }}>Cancelar</button>
          </div>
        }
      </form>
    </div >
  )
}
