//CSS imports
import style from "./UserRemarks.module.css";

//React imports
import { useContext, useState, useEffect } from "react";
import { dashboardContext } from "../../pages/Dashboard/Dashboard";

//Component imports
import RemarksCard from "../RemarksCard/RemarksCard";

export default function UserRemarks() {

    const userData = useContext(dashboardContext)
    const [remarks, setRemarks] = useState([])


    useEffect(() => {
        userData.remarks && userData.remarks.length > 0 ?
            setRemarks(userData.remarks) :
            setRemarks(undefined)
    }, [userData.remarks])

    return (
        <div className={style.wrapper}>
            <div>
                    <h2>Puntuación</h2>
                    <p>{userData.rates?.length > 0 ?
                        parseFloat(userData.rates.reduce((suma, nextRate) => suma + nextRate, 0) / userData.rates.length).toFixed(1) :
                        "El esfuerzo dará su recompensa, anima a los usuarios a que te puntúen"}</p>
                </div>
            <div>
            <h2>Opiniones</h2>
            {remarks ?

                remarks.map((remark, index) => {
                    return (
                        <RemarksCard key={remark.title + index} remark={remark} />
                    )
                }) :
                <h2>Todavía no hay opiniones. Continúa prestando tus servicios, llegarán pronto</h2>
            }
            </div>
        </div>
    )
}
