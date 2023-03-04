//SETS CUSTOMER FORM STRUCTURE

//CSS imports
import style from "./SignUpProvider.module.css";

//Component imports
import Cities from "../FetchAddressData/Cities";
import Municipalities from "../FetchAddressData/Municipalities";


export default function SignUpProviderStructure({ handleImput, saveProvider, signUpData, validator, minAge }) {
  return (
    <div className={`${style.generalDiv}`}>

      <h2 className={style.signUpTitle}>Registrarse como proveedor de servicios</h2>

      <form className={style.signUpForm} onSubmit={saveProvider()}>
        <div className={style.aloneInfo}>
          <label htmlFor="name">Nombre:</label>
          <input type="text" onChange={handleImput} value={signUpData.name} id="name" name="name" pattern="([a-zA-Z]*\s?){1,3}" maxLength="100" placeholder='Nombre' required />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="surname">Apellidos:</label>
          <input type="text" onChange={handleImput} value={signUpData.surname} id="surname" name="surname" pattern="([a-zA-Z]*\s?){1,3}" maxLength="100" placeholder='Apellidos' />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="dateOfBirth">Fecha de nacimiento:</label>
          <input type="date" onChange={handleImput} value={signUpData.dateOfBirth} id="dateOfBirth" name="dateOfBirth" max={minAge()} required />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="nationality">Nacionalidad:</label>
          <input type="text" onChange={handleImput} value={signUpData.nationality} id="nationality" name="nationality" placeholder="¿En qué país naciste?" required />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="phone">Teléfono:</label>
          <input type="text" onChange={handleImput} value={signUpData.phone} id="phone" name="phone" pattern="^\+34[0-9]{9}" placeholder='Teléfono (+34)' title="Es necesario añadir +34" required />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="email">Email:</label>
          <input type="email" onChange={handleImput} value={signUpData.email} id="email" name="email" maxLength="100" placeholder="Indica tu mejor email" required />
        </div>

        <p className={validator ? style.hideInfo : style.showInfo}>La contraseñas no coinciden</p>

        <div className={style.aloneInfo}>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" onChange={handleImput} value={signUpData.password} id="password" name="password" pattern=".{6,16}" placeholder='Contraseña (de 6 a 16 caracteres)' title="Entre 6 y 16 caracteres" required />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="passwordRepeated">Confirma contraseña:</label>
          <input type="password" onChange={handleImput} value={signUpData.passwordRepeated} id="passwordRepeated" name="passwordRepeated" placeholder='Repetir contraseña' required />
        </div>

        <div className={style.aloneInfo}>
          <label htmlFor="typeOfService">Tipo de servicio:</label>
          <select onChange={handleImput} value={signUpData.typeOfService} id="typeOfService" name="typeOfService"  >
            <option value="" hidden></option>
            <option value="Limpieza">Limpieza</option>
            <option value="Cuidado de personas">Cuidado de personas</option>
            <option value="Arreglos en casa">Arreglos en casa</option>
          </select>
        </div>

        <fieldset className={style.address} >
          <legend className={style.addressLegend}>Dirección</legend>

          <div className={style.street}>
            <label htmlFor="street">Calle:</label>
            <input type="text" onChange={handleImput} value={signUpData.street} id="street" name='street' pattern="([a-zA-Z]*\s?){1,}" maxLength="60" placeholder='Calle' />
          </div>

          <div className={style.number}>
            <label htmlFor="number">Número:</label>
            <input type="number" onChange={handleImput} value={signUpData.number} id="number" name='number' pattern="[0-9]*{1,4}" placeholder='Número' />
          </div>

          <div className={style.flat}>
            <label htmlFor="flat">Escalera, Planta, Piso:</label>
            <input type="text" onChange={handleImput} value={signUpData.flat} id="flat" name='flat' maxLength="15" placeholder='Escalera, Planta, Piso' />
          </div>

          <div className={style.postalCode}>
            <label htmlFor="postalCode">Código Postal:</label>
            <input type="number" onChange={handleImput} value={signUpData.postalCode} id="postalCode" name="postalCode" min="01000" max="52999" placeholder='C.P.' required />
          </div>

          <div className={style.locality}>
            <label htmlFor="locality">Localidad:</label>
            <input type="text" onChange={handleImput} value={signUpData.postalCode ? signUpData.locality : ""} id="locality" name="locality" pattern="([a-zA-Z]*\s?){1,}" maxLength="60" placeholder='Localidad' list="municipalities" required />
            <Municipalities cp = {signUpData.postalCode.substring(0,2)} />
          </div>

          <div className={style.city}>
            <label htmlFor="city">Ciudad:</label>
            <input type="text" onChange={handleImput} value={signUpData.postalCode ? Cities(signUpData.postalCode.substring(0,2)) : ""} id="city" name='city' pattern="([a-zA-Z]*\s?){1,}" maxLength="60" placeholder='Ciudad' list="cities" required />
          </div>

          <div className={style.country}>
            <label htmlFor="country">País:</label>
            <input type="text" onChange={handleImput} value={signUpData.country} id="country" name='country' pattern="([a-zA-Z]*\s?){1,}" maxLength="60" placeholder='País' required />
          </div>
        </fieldset>

        <input className={style.btnSendSign} type="submit" value="Enviar" />

      </form>

    </div>
  )
}
