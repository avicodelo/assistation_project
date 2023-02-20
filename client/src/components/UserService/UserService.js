//CSS imports
import style from "./UserService.module.css";

//React imports
import { useContext } from "react";
import { dashboardContext } from "../../pages/Dashboard/Dashboard";


export default function UserService() {
  const userData = useContext(dashboardContext);

  return (
    <div className={style.wrapper}>
      <div className={style.mainContainer}>

        <div className={style.infoContainer}>
          <h3>Servicio que presta: </h3>
          <h3>{userData.typeOfService}</h3>
        </div>

        {userData.price ?
          (<div className={style.infoContainer}>
            <h3>Precio: </h3>
            <h3>{userData.price + " €/h"}</h3>
          </div>) :
          (<div className={style.priceContainer}>
            <p className={style.textPrice}>Trabajar gratis es esclavitud, ¡ponle precio a tu servicio!</p>
            <input className={style.setPriceInput} type="number" placeholder="Precio del servicio" />
            <button className={style.savePrice}><p>Guardar</p></button>
          </div>)}
      </div>
    </div>
  )
}
