//CSS imports
import style from "./UserAddress.module.css";

//React imports
import { useContext, useState } from "react"
import { dashboardContext } from "../../pages/Dashboard/Dashboard"

//Hook imports
import { useUpdateInfo } from "../../Hooks/useUpdateInfo";

export default function UserAddress() {

    const initialUserData = {
        "address.street": "",
        "address.number": "",
        "address.flat": "",
        "address.postalCode": "",
        "address.locality": "",
        "address.city": ""
    }
    const userData = useContext(dashboardContext);
    const [denyUpdate, setDenyUpdate] = useState(true)
    const [dataUpdated, handleInput, updateInfo] = useUpdateInfo(initialUserData)
    const { address } = userData;

    return (
        <div className={style.wrapper}>
            <div className={style.mainContainer}>
                <div className={style.infoContainer}>
                    <h3>Calle: </h3>
                    {!denyUpdate ?
                        <input type="text" name="address.street" onChange={handleInput} value={dataUpdated["address.street"]}
                            placeholder={userData.street} pattern="([a-zA-Z]*\s?){1,3}" maxLength="50" /> :
                        <h3>{address?.street}</h3>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h3>Nº: </h3>
                    {!denyUpdate ?
                        <input type="text" name="address.number" onChange={handleInput} value={dataUpdated["address.number"]}
                            placeholder={userData.number} pattern="([a-zA-Z]*\s?){1,3}" maxLength="50" /> :
                        <h3>{address?.number}</h3>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h3>Piso: </h3>
                    {!denyUpdate ?
                        <input type="text" name="address.flat" onChange={handleInput} value={dataUpdated["address.flat"]}
                            placeholder={userData.flat} pattern="([a-zA-Z]*\s?){1,3}" maxLength="50" /> :
                        <h3>{address?.flat}</h3>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h3>Localidad: </h3>
                    {!denyUpdate ?
                        <input type="text" name="address.locality" onChange={handleInput} value={dataUpdated["address.locality"]}
                            placeholder={userData.locality} pattern="([a-zA-Z]*\s?){1,3}" maxLength="50" /> :
                        <h3>{address?.locality}</h3>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h3>Ciudad: </h3>
                    {!denyUpdate ?
                        <input type="text" name="address.city" onChange={handleInput} value={dataUpdated["address.city"]}
                            placeholder={userData.city} pattern="([a-zA-Z]*\s?){1,3}" maxLength="50" /> :
                        <h3>{address?.city}</h3>
                    }

                </div>
                <div className={style.infoContainer}>
                    <h3>Código Postal: </h3>
                    {!denyUpdate ?
                        <input type="text" name="address.postalCode" onChange={handleInput} value={dataUpdated["address.postalCode"]}
                            placeholder={userData.postalCode} pattern="([a-zA-Z]*\s?){1,3}" maxLength="50" /> :
                        <h3>{address?.postalCode}</h3>
                    }
                </div>
                <div className={style.infoContainer}>
                    <h3>País: </h3>
                    <h3>{address?.country}</h3>
                </div>
                {denyUpdate ?
                    <div><button onClick={() => setDenyUpdate(false)}>Actualizar</button></div> :
                    <div>
                        <button onClick={() => setDenyUpdate(true)}>Cancelar</button>
                        <button onClick={updateInfo}>Aplicar cambios</button>
                    </div>
                }
            </div>
        </div>
    )
}
