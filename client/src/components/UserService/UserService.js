//CSS imports
import style from "./UserService.module.css";

//React imports
import { useContext} from "react";
import { dashboardContext } from "../../pages/Dashboard/Dashboard"

//Hook imports
import { useUpdateInfo } from "../../Hooks/useUpdateInfo"

export default function UserService() {


  const userData =useContext(dashboardContext)
  
  const serviceInitialState = {
    price: "",
    areaOfResponsibility: userData.areaOfResponsibility,
    setAreaOfResponsibility: ""
  }


  const [dataUpdated, handleInput, updateInfo, addItem, removeItem, activateArea, setActivateArea, userDataUpdated] = useUpdateInfo(serviceInitialState, userData)

  return (
    <div className={style.wrapper} >
      <form className={style.mainContainer} onSubmit={updateInfo}>

        <div className={style.infoContainer}>
          <h3>Servicio que presta: </h3>
          <h3>{userData.typeOfService}</h3>
        </div>

        {userData.price ?
          <div className={style.infoContainer}>
            <h3>Precio: </h3>
            {!activateArea ?
              <div>
                <h3>{ (userDataUpdated.price? userDataUpdated.price: userData.price)  + " €/h"}</h3>
              </div> :
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
            <h3>Municipios donde trabajo: </h3>
            {!activateArea ?
              <div>
                <h3>{userDataUpdated.areaOfResponsibility ? userDataUpdated.areaOfResponsibility?.join(", "): userData.areaOfResponsibility?.join(", ")}</h3>
              </div> :
              <div>
                <input type="text" onChange={handleInput} name="setAreaOfResponsibility" value={dataUpdated.setAreaOfResponsibility} />
                <button onClick={addItem}>Añadir</button>
                {(userData.areaOfResponsibility? dataUpdated.areaOfResponsibility : userData.areaOfResponsibility).map((value, index) => {
                  return (
                    <div key={index + value}>
                      <p >{value + " "} <button onClick={removeItem} name={index}>X</button></p>
                    </div>
                  )
                })}

              </div>
            }
          </div> :
          <div className={style.priceContainer}>
            <p className={style.textPrice}>Deja que los demás sepan por dónde te mueves. Indica los municipios en los que trabajas</p>
            <input type="text" onChange={handleInput} name="setAreaOfResponsibility" value={dataUpdated.setAreaOfResponsibility} />
            <button onClick={addItem}>Añadir</button>
            {dataUpdated.areaOfResponsibility.map((value, index) => {
              return (
                <div key={index + value}>
                  <p >{value + " "} <button onClick={removeItem} name={index}>X</button></p>
                </div>
              )
            })}

          </div>
        }
        {!activateArea ?
          <div><button onClick={(e) => {
            e.preventDefault()
            setActivateArea(true)
          }}>Actualizar</button></div> :
          <div>
            <button onClick={(e) => {
              e.preventDefault()
              setActivateArea(false)
            }}>Cancelar</button>
            <button type="submit">Aplicar cambios</button>
          </div>
        }
      </form>
    </div >
  )
}
