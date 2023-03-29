//React imports
import { useState } from "react"

//Component imports
import { URL_REMARKS } from "../../settings/Settings";

export default function ShareRemark({ setActivateArea, userID }) {

    const initialState = {
        title: "",
        mainBody: "",
        rate: ""
    }

    const [shareRemark, setShareRemark] = useState(initialState)
    const accessToken = localStorage.getItem("accesstoken")

    const handleInput = (e) => {
        setShareRemark({ ...shareRemark, ...{ [e.target.name]: e.target.value } })
    }

    console.log(shareRemark);

    const setRemark = () => {
        return (e) => {
            e.preventDefault()

            const postInfo = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify(shareRemark)
            }

            fetch(`${URL_REMARKS}/postRemark/${userID}`, postInfo)
                .then(res => res.json())
                .then((data) => console.log(data))
        }
    }

    return (
        <form onSubmit={setRemark()}>
            <label htmlFor="title">Título</label>
            <input type="text" onChange={handleInput} value={shareRemark.title} id="title" name="title" required />

            <label htmlFor="mainBody">Escribe tu opinión</label>
            <textarea onChange={handleInput} value={shareRemark.mainBody} id="mainBody" name="mainBody" required></textarea>

            <label htmlFor="rate">Puntuación</label>
            <input type="number" onChange={handleInput} value={shareRemark.rate} id="rate" name="rate" min="0" max="5" required />

            <button onClick={(e) => {
                e.preventDefault();
                setActivateArea(false)
            }}>Cancelar</button>
            <button type="submit">Enviar</button>
        </form>
    )
}
