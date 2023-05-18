//CSS imports
import style from "./RemarksCard.module.css"

//Component imports
import { SERVER_HOST } from "../../settings/Settings";


export default function RemarksCard({ remark }) {
    const deplowDate = remark?.deployDate.split("T")

    return (
        <div className={style.mainWrapper}>
            <div className={style.writerInfo}>
                <img className={style.img} src={SERVER_HOST + remark.writer?.photo} alt="Foto de usuario" width="50" />
                <p className={style.name}>{remark.writer?.name + " " + remark.writer?.surname}</p>
                <p className={style.address}>{remark.writer?.address.city}</p>
            </div>
            <p className={style.rate}>{remark?.rate} <i className="fa-solid fa-star"></i></p>
            <div className={style.remarkWrapper}>
            <p className={style.title}>{remark?.title}</p>
            <h6 className={style.date}>{deplowDate[0]}</h6>
            <p className={style.text}>{remark?.mainBody}</p>
            </div>
        </div>

    )
}
