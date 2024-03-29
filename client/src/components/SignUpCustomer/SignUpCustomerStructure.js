//SETS CUSTOMER FORM STRUCTURE

//CSS imports
import style from "./SignUpCustomer.module.css";

//Component imports
import Municipalities from "../FetchAddressData/Municipalities";

//Hook imports
import { useMinAge } from "../../Hooks/useMinAge";

export default function SignUpCustomerStructure({ handleImput, signUpCustomer, signUpData, validator }) {

  //Const settings
  const minAge = useMinAge()

  return (
    <div className={`${style.generalDiv}`}>

      <h3 className={style.signUpTitle}>Registrarse como cliente</h3>

      <p className={style.gapsRequired}>Los campos marcados <span className={style.required}>*</span> son obligatorios</p>
    
      <form className={style.signUpForm} onSubmit={signUpCustomer()}>

        <div className={style.aloneInfo}>
          <label htmlFor="name">Nombre<span className={style.required}>*</span>:</label>
          <input type="text" onChange={handleImput} value={signUpData.name} id="name" name="name" pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,3}" maxLength="50" placeholder='Nombre' required />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="surname">Apellidos<span className={style.required}>*</span>:</label>
          <input type="text" onChange={handleImput} value={signUpData.surname} id="surname" name="surname" pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,3}" maxLength="50" placeholder='Apellidos' />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="dateOfBirth">Fecha de nacimiento<span className={style.required}>*</span>:</label>
          <input type="date" onChange={handleImput} value={signUpData.dateOfBirth} id="dateOfBirth" name="dateOfBirth" max={minAge} required />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="nationality">Nacionalidad<span className={style.required}>*</span>:</label>
          <input type="text" onChange={handleImput} value={signUpData.nationality} id="nationality" name="nationality" maxLength="50" placeholder="¿En qué país naciste?" required />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="phone">Teléfono<span className={style.required}>*</span>:</label>
          <input type="text" onChange={handleImput} value={signUpData.phone} id="phone" name="phone" pattern="^\+34[0-9]{9}" placeholder='Teléfono (+34)' title="Es necesario añadir +34" required />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="email">Email<span className={style.required}>*</span>:</label>
          <input type="email" onChange={handleImput} value={signUpData.email} id="email" name="email" maxLength="100" placeholder="Indica tu mejor email" required />
        </div>

        <p className={validator ? style.hideInfo : style.showInfo}>Las contraseñas no coinciden</p>

        <div className={style.aloneInfo}>
          <label htmlFor="password">Contraseña<span className={style.required}>*</span>:</label>
          <input type="password" onChange={handleImput} value={signUpData.password} id="password" name="password" pattern=".{6,16}" placeholder='Contraseña (de 6 a 16 caracteres)' title="Entre 6 y 16 caracteres" required />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="passwordRepeated">Confirma contraseña<span className={style.required}>*</span>:</label>
          <input type="password" onChange={handleImput} value={signUpData.passwordRepeated} id="passwordRepeated" name="passwordRepeated" placeholder='Repetir contraseña' required />
        </div>

        <fieldset className={style.address} >
          <legend className={style.addressLegend}>Dirección</legend>

          <div className={style.street}>
            <label htmlFor="street">Calle<span className={style.required}>*</span>:</label>
            <input type="text" onChange={handleImput} value={signUpData.street} id="street" name='street' pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,}" maxLength="60" placeholder='Calle' />
          </div>

          <div className={style.number}>
            <label htmlFor="number">Número<span className={style.required}>*</span>:</label>
            <input type="number" onChange={handleImput} value={signUpData.number} id="number" name='number' pattern="[0-9]*{1,4}" placeholder='Número' />
          </div>

          <div className={style.flat}>
            <label htmlFor="flat">Escalera, Planta, Piso:</label>
            <input type="text" onChange={handleImput} value={signUpData.flat} id="flat" name='flat' maxLength="15" placeholder='Escalera, Planta, Piso' />
          </div>

          <div className={style.postalCode}>
            <label htmlFor="postalCode">Código Postal<span className={style.required}>*</span>:</label>
            <input type="text" onChange={handleImput} value={signUpData.postalCode} id="postalCode" name="postalCode" pattern="[0-5][0-9]{4}" maxLength="5" placeholder='C.P.' required />
          </div>

          <div className={style.locality}>
            <label htmlFor="locality">Localidad<span className={style.required}>*</span>:</label>
            <input type="text" onChange={handleImput} value={signUpData.postalCode ? signUpData.locality : ""} id="locality" name="locality"
              pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,}" maxLength="60" placeholder='Localidad' list="municipalities" required />
            <Municipalities cp={signUpData.postalCode.substring(0, 2)} />
          </div>

          <div className={style.city}>
            <label htmlFor="city">Ciudad:</label>
            <input type="text" onChange={handleImput} value={signUpData.city} id="city" name='city'
              pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,}" maxLength="60" placeholder='Ciudad' disabled={signUpData.postalCode} />
          </div>

          <div className={style.country}>
            <label htmlFor="country">País:</label>
            <input type="text" onChange={handleImput} value={signUpData.country} id="country" name='country' pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,}" maxLength="60" placeholder='País' />
          </div>
        </fieldset>


        <input className={style.btnSendSign} type="submit" value="Enviar" />

      </form>

    </div>
  )
}
