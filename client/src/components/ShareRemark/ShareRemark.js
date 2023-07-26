//SHARES THE REMARK AND KEEP IT IN DDBB

//CSS import
import style from "./ShareRemark.module.css"

//React imports
import { useState } from "react"

//Component imports
import { URL_REMARKS } from "../../settings/Settings";

export default function ShareRemark({ setActivateArea, userID }) {

    //Const settings
    const initialState = {
        title: "",
        mainBody: "",
        rate: 3
    }
    const [shareRemark, setShareRemark] = useState(initialState)
    const accessToken = localStorage.getItem("accesstoken")

    //Saves inputs in an object variable
    const handleInput = (e) => {
        setShareRemark({ ...shareRemark, ...{ [e.target.name]: e.target.value } })
    }

    const setRemark = () => {
        return (e) => {
            e.preventDefault()

            //POST data
            const postInfo = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify(shareRemark)
            }

            //Comunicates with API REST
            fetch(`${URL_REMARKS}/${userID}`, postInfo)
                .then(res => res.json())
                .then(setActivateArea(false))
        }
    }

    return (
        <form className={style.remarkForm} onSubmit={setRemark()}>
            <div className={style.remarkTitle}>
                <label htmlFor="title">Título</label>
                <input  type="text" onChange={handleInput} value={shareRemark.title} id="title" name="title" required />
            </div>

            <div className={style.remarkText}>
                <label htmlFor="mainBody">Escribe tu opinión</label>
                <textarea onChange={handleInput} value={shareRemark.mainBody} id="mainBody" name="mainBody" rows="3" maxLength="200" required></textarea>
            </div>

            <div className={style.remarkRate}>
                <label htmlFor="rate">Puntuación</label>
                <input  type="range" onChange={handleInput} value={shareRemark.rate} id="rate" name="rate" step="0.5" min="0" max="5" required/>
                <p>{shareRemark.rate}</p>
            </div>

            <button className={style.stdBtn} onClick={(e) => {
                e.preventDefault();
                setActivateArea(false)
            }}>Cancelar</button>
            <button className={style.stdBtn} type="submit">Enviar</button>
        </form>
    )
}
