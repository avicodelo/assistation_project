//SETS THE PROVIDERCARD STRUCTURE 

//CSS imports
import style from "./ProviderCard.module.css";


export default function ProviderCard({ providerData }) {
  return (
    <div className={style.cardBody}>
      <div className={style.cardPhoto}>
        <img src={providerData.photo}  alt="" />
      </div>
      <section className={style.cardInfo}>
        <h4 className={style.providerData}>{`${providerData.name} ${providerData.surname}`}</h4>
        
        <h4 className={style.providerData}>{providerData.address.city}</h4>

        <h4 className={style.providerData}>{providerData.typeOfService}</h4>

        <p className={style.providerData}>{providerData.description}</p>

        <div className={style.serviceInfo}>
          <p className={style.providerData}>{providerData.rates}</p>
          <h4 className={style.providerData}>{providerData.price}</h4>
        </div>
      </section>
    </div>
  )
}
