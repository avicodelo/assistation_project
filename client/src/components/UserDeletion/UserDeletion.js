//COMPONENT TO DELETE DE USER

//CSS imports
import style from "./UserDeletion.module.css";

//React imports
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

//Component imports
import { URL_DASHBOARD } from '../../settings/Settings'

export default function UserDeletion() {

    //Const settings
    const { userID } = useParams()
    const accessToken = localStorage.getItem("accesstoken")
    const navigate = useNavigate()
    const [checkPassword, setCheckPassword] = useState({ password: "" })
    const [activateInput, setActivateInput] = useState(false)

    //Saves inputs in an object variable
    const handleInput = (e) => {
        setCheckPassword({ ...checkPassword, ...{ [e.target.name]: e.target.value } })
    }

    //Deletes the user using the API REST
    const deleteUser = () => {
        return () => {

            //DELETE data
            const deleteInfo = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify(checkPassword)
            }

            //Resets the local Storage and goes to home page
            fetch(URL_DASHBOARD + userID, deleteInfo)
                .then(res => res.json())
                .then((deletionData) => {
                    if (deletionData.ok) {
                        localStorage.removeItem("accesstoken")
                        localStorage.removeItem("userID")
                        navigate("/")
                    }
                })
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.mainContainer}>
                <h4>Quiero borrar mi usuario</h4>
                {!activateInput ?
                    <button className={style.btnDelete} onClick={() => { setActivateInput(true) }}>Eliminar usuario</button> :
                    <div className={style.passwordContainer}>
                        <h4>Confirmar contraseña: </h4>
                        <input type="password" name="password" onChange={handleInput} value={checkPassword.password} />
                        <div>
                            <button className={style.btnChange} onClick={() => { setActivateInput(false) }}>Cancelar</button>
                            <button className={style.btnDelete} onClick={deleteUser()} >Eliminar usuario</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
