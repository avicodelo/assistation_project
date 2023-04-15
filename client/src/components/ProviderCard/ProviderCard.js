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

      <div className={style.cardAvatar}>
        <img src={SERVER_HOST + providerData.photo} alt="" />
        <h4 className={`${style.providerData} ${style.nameData}`}>{`${providerData.name} ${providerData.surname}`}</h4>
        <h4 className={`${style.providerData} ${style.addressData}`}>{providerData.address.city}</h4>
      </div>

      <section className={style.cardInfo}>
        <div className={style.serviceData}>
          <h4 className={style.providerData}>{providerData.typeOfService}</h4>
          <h4 className={`${style.providerData} ${style.priceData}`}>{providerData.price} €/h</h4>
        </div>
        <p className={style.providerData}>{providerData.description}</p>
        <p className={style.providerData}>Puntuación: {providerData?.avgRate ?
          providerData?.avgRate.toFixed(1) :
          "-"}</p>
      </section>

    </NavLink>
  )
}
