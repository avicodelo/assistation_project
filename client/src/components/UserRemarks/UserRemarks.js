//CSS imports
import style from "./UserRemarks.module.css";

//React imports
import { useContext } from "react";
import { dashboardContext } from "../../pages/Dashboard/Dashboard";

export default function UserRemarks() {

    const userData = useContext(dashboardContext)

    return (
        <div className={style.wrapper}>
            <div className={style.mainContainer}>
                <div className={style.infoContainer}>
                    <h3>Puntuación: </h3>
                    <h3>{userData.rates}</h3>
                </div>
                <div className={style.infoContainer}>
                    <h3>{userData.remarks}</h3>
                </div>
            </div>
        </div>
    )
}
