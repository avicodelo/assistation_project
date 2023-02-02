import style from "./ProviderCard.module.css";


export default function ProviderCard({ providerData }) {
  console.log(providerData.photo);
  return (
    <div className={style.cardBody}>
      <div className={style.cardPhoto}>
        <img src={providerData.photo} width="100%" alt="" />
      </div>
      <section className={style.cardInfo}>
        <h3 className={style.providerData}>{`${providerData.name} ${providerData.surname}`}</h3>
        
        <h3 className={style.providerData}>{providerData.typeOfService}</h3>

        <p className={style.providerData}>{providerData.description}</p>

        <div className={style.serviceInfo}>
          <p className={style.providerData}>{providerData.rates}</p>
          <h3 className={style.providerData}>{providerData.price}</h3>
        </div>
      </section>
    </div>
  )
}
