//CSS imports
import style from "./UserRemarks.module.css";

//React imports
import { useContext, useState, useEffect } from "react";
import { dashboardContext } from "../../pages/Dashboard/Dashboard";

//Component imports
import RemarksCard from "../RemarksCard/RemarksCard";
import { URL_REMARKS } from "../../settings/Settings";

//Hook imports
import { usePagination } from "../../Hooks/usePagination"

export default function UserRemarks() {

    const userData = useContext(dashboardContext)
    const [remarks, setRemarks] = useState([])
    const [totalPages, setTotalPages] = useState(undefined)
    const [handlePage, pageState] = usePagination(totalPages)

    useEffect(() => {
        fetch(`${URL_REMARKS}/getRemarks/${userData?._id}?page=${pageState.page}`)
            .then(res => res.json())
            .then(({ totalPages, results }) => {
                setTotalPages (totalPages);
                results && results.length > 0 ?
                    setRemarks(results) :
                    setRemarks(undefined)
            })
    }, [pageState.page])

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
                    <div>
                        {
                            remarks.map((remark, index) => {
                                return (
                                    <RemarksCard key={remark.title + index} remark={remark} />
                                )
                            })
                        }
                             <div>
                                <button onClick={() => { handlePage("DECREASE") }}>&larr;</button>
                                <p>{pageState.page + "/" + totalPages}</p>
                                <button onClick={() => { handlePage("INCREASE") }}>&rarr;</button>
                            </div>
                    </div> :
                    <h2>Todavía no hay opiniones. Continúa prestando tus servicios, llegarán pronto</h2>
                }
            </div>
        </div>
    )
}
