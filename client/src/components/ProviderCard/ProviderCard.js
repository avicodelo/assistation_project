//SETS THE PROVIDERCARD STRUCTURE 

//CSS imports
import style from "./ProviderCard.module.css";

//React imports
import { NavLink } from "react-router-dom";

//Component imports
import { SERVER_HOST } from "../../settings/Settings";

export default function ProviderCard({ providerData }) {

  const { _id } = providerData

  return (
    <NavLink className={style.cardBody} to={`/userInfo/${_id}`} >
      <div className={style.cardPhoto}>
        <img src={SERVER_HOST + providerData.photo} alt="" />
      </div>
      <section className={style.cardInfo}>
        <h4 className={style.providerData}>{`${providerData.name} ${providerData.surname}`}</h4>

        <h4 className={style.providerData}>{providerData.address.city}</h4>

        <h4 className={style.providerData}>{providerData.typeOfService}</h4>

        <p className={style.providerData}>{providerData.description}</p>

        <div className={style.serviceInfo}>

          <p className={style.providerData}>Nota: {providerData?.avgRate ?
            providerData?.avgRate :
            "-"}</p> 
        </div>
        <h4 className={style.providerData}>{providerData.price} €/h</h4>
      </section>
    </NavLink>
  )
}
