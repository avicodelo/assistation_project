//SHOWS USER'S ADDRESS INFO

//CSS imports
import style from "./UserAddress.module.css";

//Component imports
import Municipalities from "../FetchAddressData/Municipalities";

//React imports
import { useContext } from "react"
import { dashboardContext } from "../../pages/Dashboard/Dashboard"

//Hook imports
import { useUpdateInfo } from "../../Hooks/useUpdateInfo";

export default function UserAddress() {

    //Const settings
    const userData = useContext(dashboardContext);
    const initialUserData = {
        "address.street": "",
        "address.number": "",
        "address.flat": "",
        "address.postalCode": "",
        "address.locality": "",
        "address.city": ""
    }
    
    //Hook that manages the user data
    const [dataUpdated, handleInput, updateInfo, _addItem, _removeItem, activateArea, setActivateArea, userDataUpdated] = useUpdateInfo(initialUserData, userData)
    const { address } = userDataUpdated.address ? userDataUpdated : userData;

    return (
        <div className={style.wrapper}>
            <form className={style.mainContainer} onSubmit={updateInfo}>
                <div className={style.infoContainer}>
                    <h4>Calle: </h4>
                    {activateArea ?
                        <input type="text" name="address.street" onChange={handleInput} value={dataUpdated["address.street"]}
                            placeholder={address?.street} pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,}" maxLength="50" /> :
                        <h4>{address?.street}</h4>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h4>Nº: </h4>
                    {activateArea ?
                        <input type="text" name="address.number" onChange={handleInput} value={dataUpdated["address.number"]}
                            placeholder={address?.number} maxLength="50" /> :
                        <h4>{address?.number}</h4>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h4>Piso: </h4>
                    {activateArea ?
                        <input type="text" name="address.flat" onChange={handleInput} value={dataUpdated["address.flat"]}
                            placeholder={address?.flat} maxLength="50" /> :
                        <h4>{address?.flat}</h4>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h4>Código Postal: </h4>
                    {activateArea ?
                        <input type="text" name="address.postalCode" onChange={handleInput} value={dataUpdated["address.postalCode"]}
                            placeholder={address?.postalCode} pattern="[0-5][0-9]{4}" maxLength="5" /> :
                        <h4>{address?.postalCode}</h4>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h4>Ciudad: </h4>
                    {activateArea ?
                        <input type="text" name="address.city" onChange={handleInput} value={dataUpdated["address.postalCode"] ? dataUpdated["address.city"] : ""}
                            placeholder={address?.city} pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,}" maxLength="50"
                            disabled={dataUpdated["address.postalCode"]} /> :
                        <h4>{address?.city}</h4>
                    }

                </div>
                <div className={style.infoContainer}>
                    <h4>Localidad: </h4>
                    {activateArea ?
                        <div>
                            <input type="text" name="address.locality" onChange={handleInput} value={dataUpdated["address.postalCode"] ? dataUpdated["address.locality"] : ""}
                                placeholder={address?.locality} pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,}" maxLength="50"
                                required={dataUpdated["address.postalCode"]} list="municipalities" />
                            <Municipalities cp={dataUpdated["address.postalCode"] && dataUpdated["address.postalCode"].substring(0, 2)} />
                        </div> :
                        <h4>{address?.locality}</h4>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h4>País: </h4>
                    <h4>{address?.country}</h4>
                </div>
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
        </div>
    )
}
