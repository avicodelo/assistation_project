//SETS CUSTOMER FORM STRUCTURE

//CSS imports
import style from "./SignUpCustomer.module.css";

export default function SignUpCustomerStructure({ handleImput, signUpCustomer, signUpData, validator }) {
  return (
    <div className={`${style.generalDiv}`}>

      <h2 className={style.signUpTitle}>Registrarse como cliente</h2>

      <form className={style.signUpForm} onSubmit={signUpCustomer()}>

        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" onChange={handleImput} value={signUpData.name} id="name" name="name" placeholder='Nombre' required />
        </div>

        <div>
          <label htmlFor="surname">Apellidos:</label>
          <input type="text" onChange={handleImput} value={signUpData.surname} id="surname" name="surname" placeholder='Apellidos' />
        </div>

        <div>
          <label htmlFor="dateOfBirth">Fecha de nacimiento:</label>
          <input type="date" onChange={handleImput} value={signUpData.dateOfBirth} id="dateOfBirth" name="dateOfBirth" required />
        </div>

        <div>
          <label htmlFor="phone">Teléfono:</label>
          <input type="text" onChange={handleImput} value={signUpData.phone} id="phone" name="phone" placeholder='Teléfono' required />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" onChange={handleImput} value={signUpData.email} id="email" name="email" placeholder="Indica tu mejor email" required />
        </div>

        <p className={validator ? style.hideInfo : style.showInfo}>La contraseñas no coinciden</p>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" onChange={handleImput} value={signUpData.password} id="password" name="password" placeholder='Contraseña' required />
        </div>

        <div>
          <label htmlFor="passwordRepeated">Confirma contraseña:</label>
          <input type="password" onChange={handleImput} value={signUpData.passwordRepeated} id="passwordRepeated" name="passwordRepeated" placeholder='Repetir contraseña' required />
        </div>

        <div>
          <label htmlFor="city">Ciudad:</label>
          <input type="text" onChange={handleImput} value={signUpData.city} id="city" name='city' placeholder='Ciudad' />
        </div>

        <div>
          <label htmlFor="locality">Localidad:</label>
          <input type="text" onChange={handleImput} value={signUpData.locality} id="locality" name="locality" placeholder='Localidad' />
        </div>

        <div>
          <label htmlFor="postalCode">Código Postal:</label>
          <input type="text" onChange={handleImput} value={signUpData.postalCode} id="postalCode" name="postalCode" placeholder='C.P.' required />
        </div>

        <input className={style.btnSendSign} type="submit" value="Enviar" />

      </form>

    </div>
  )
}
