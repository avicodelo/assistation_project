//SHOWS USER'S REMARKS

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

    //Const settings
    const userData = useContext(dashboardContext)
    const [remarks, setRemarks] = useState([])
    const [totalPages, setTotalPages] = useState(undefined)
    const [handlePage, pageState] = usePagination(totalPages)

    //Set pages to show remarks
    useEffect(() => {
        fetch(`${URL_REMARKS}/${userData?._id}?page=${pageState.page}`)
            .then(res => res.json())
            .then(({ totalPages, results }) => {
                setTotalPages(totalPages);
                results && results.length > 0 ?
                    setRemarks(results) :
                    setRemarks(undefined)
            })
    }, [pageState.page])

    return (
        <div className={style.wrapper}>
            <div className={style.markContainer}>
                <h3 >Puntuación</h3>
                {userData.rates?.length > 0 ?
                    <h3>{parseFloat(userData.rates.reduce((suma, nextRate) => suma + nextRate, 0) / userData.rates.length).toFixed(1)}  <i className="fa-solid fa-star"></i></h3> :
                    <p>Todavía no tienes ninguna puntuación</p>
                }
            </div>
            <div className={style.remarksContainer}>
                <h3>Opiniones</h3>
                {remarks ?
                    <div>
                        {
                            remarks.map((remark, index) => {
                                return (
                                    <RemarksCard key={remark.title + index} remark={remark} />
                                )
                            })
                        }
                        <div className={style.pagination}>
                            <button className={style.pageBut} onClick={() => { handlePage("DECREASE") }}>&larr;</button>
                            <p className={style.pageNumber}>{pageState.page + "/" + totalPages}</p>
                            <button className={style.pageBut} onClick={() => { handlePage("INCREASE") }}>&rarr;</button>
                        </div>
                    </div> :
                    <h2>Todavía no hay opiniones. Continúa prestando tus servicios, llegarán pronto</h2>
                }
            </div>

        </div>
    )
}
