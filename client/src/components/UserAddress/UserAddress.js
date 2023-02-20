//CSS imports
import style from "./UserAddress.module.css";

//React imports
import { useContext } from "react"
import { dashboardContext } from "../../pages/Dashboard/Dashboard"


export default function UserAddress() {
    const userData = useContext(dashboardContext);
    const { address } = userData;

    return (
        <div className={style.wrapper}>
            <div className={style.mainContainer}>
            <div className={style.infoContainer}>
                <h3>Calle: </h3>
                <h3>{address?.street}</h3>
            </div>
            <div className={style.infoContainer}>
                <h3>Nº: </h3>
                <h3>{address?.number}</h3>
            </div>
            <div className={style.infoContainer}>
                <h3>Piso: </h3>
                <h3>{address?.flat}</h3>
            </div>
            <div className={style.infoContainer}>
                <h3>Localidad: </h3>
                <h3>{address?.locality}</h3>
            </div>
            <div className={style.infoContainer}>
                <h3>Ciudad: </h3>
                <h3>{address?.city}</h3>
            </div>
            <div className={style.infoContainer}>
                <h3>Código Postal: </h3>
                <h3>{address?.postalCode}</h3>
            </div>
            <div className={style.infoContainer}>
                <h3>País: </h3>
                <h3>{address?.country}</h3>
            </div>
            </div>
        </div>
    )
}
