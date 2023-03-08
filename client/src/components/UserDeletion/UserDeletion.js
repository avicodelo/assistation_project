import { URL_DASHBOARD } from '../../settings/Settings'

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function UserDeletion() {

    const { userID } = useParams()
    const accessToken = localStorage.getItem("accesstoken")
    const navigate = useNavigate()

    const [checkPassword, setCheckPassword] = useState({ password: "" })
    const [activateInput, setActivateInput] = useState(false)


    const handleInput = (e) => {
        setCheckPassword({ ...checkPassword, ...{ [e.target.name]: e.target.value } })
    }
    const deleteUser = () => {
        return () => {
            const deleteInfo = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify(checkPassword)
            }


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
        <div>
            <h3>Quiero borrar mi usuario</h3>
            {!activateInput ?
                <button onClick={() => { setActivateInput(true) }}>Continuar</button> :
                <div>
                    <p>Confirmar contraseña: </p>
                    <input type="password" name="password" onChange={handleInput} value={checkPassword.password} />
                    <div>
                        <button onClick={() => { setActivateInput(false) }}>Cancelar</button>
                        <button onClick={deleteUser()} >Eliminar usuario</button>
                    </div>
                </div>
            }

        </div>
    )
}
