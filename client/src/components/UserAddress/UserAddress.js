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
    const userData = useContext(dashboardContext);

    const initialUserData = {
        "address.street": "",
        "address.number": "",
        "address.flat": "",
        "address.postalCode": "",
        "address.locality": "",
        "address.city": ""
    }
    const [dataUpdated, handleInput, updateInfo, _addItem, _removeItem, activateArea, setActivateArea, userDataUpdated] = useUpdateInfo(initialUserData, userData)
    const { address } = userDataUpdated.address? userDataUpdated : userData;

    return (
        <div className={style.wrapper}>
            <form className={style.mainContainer} onSubmit={updateInfo}>
                <div className={style.infoContainer}>
                    <h3>Calle: </h3>
                    {activateArea ?
                        <input type="text" name="address.street" onChange={handleInput} value={dataUpdated["address.street"]}
                            placeholder={address?.street} pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,}" maxLength="50" /> :
                        <h3>{address?.street}</h3>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h3>Nº: </h3>
                    {activateArea ?
                        <input type="text" name="address.number" onChange={handleInput} value={dataUpdated["address.number"]}
                            placeholder={address?.number} maxLength="50" /> :
                        <h3>{address?.number}</h3>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h3>Piso: </h3>
                    {activateArea ?
                        <input type="text" name="address.flat" onChange={handleInput} value={dataUpdated["address.flat"]}
                            placeholder={address?.flat} maxLength="50" /> :
                        <h3>{address?.flat}</h3>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h3>Código Postal: </h3>
                    {activateArea ?
                        <input type="text" name="address.postalCode" onChange={handleInput} value={dataUpdated["address.postalCode"]}
                            placeholder={address?.postalCode} pattern="[0-5][0-9]{4}" maxLength="5" /> :
                        <h3>{address?.postalCode}</h3>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h3>Ciudad: </h3>
                    {activateArea ?
                        <input type="text" name="address.city" onChange={handleInput} value={dataUpdated["address.postalCode"]?dataUpdated["address.city"]:""}
                            placeholder={address?.city} pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,}" maxLength="50" 
                             disabled={dataUpdated["address.postalCode"]}/> :
                        <h3>{address?.city}</h3>
                    }

                </div>
                <div className={style.infoContainer}>
                    <h3>Localidad: </h3>
                    {activateArea ?
                        <div>
                            <input type="text" name="address.locality" onChange={handleInput} value={dataUpdated["address.postalCode"]?dataUpdated["address.locality"]: ""}
                                placeholder={address?.locality} pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,}" maxLength="50" 
                                required={dataUpdated["address.postalCode"]} list="municipalities" />
                            <Municipalities cp={dataUpdated["address.postalCode"] && dataUpdated["address.postalCode"].substring(0, 2)} />
                        </div> :
                        <h3>{address?.locality}</h3>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h3>País: </h3>
                    <h3>{address?.country}</h3>
                </div>
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
        </div>
    )
}
