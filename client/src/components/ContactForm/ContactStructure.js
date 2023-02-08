//THIS STABLISHES THE CONTACT COMPONENT STRUCTURE

//CSS imports
import style from "./ContactForm.module.css";

export default function ContactStructure({ handleInput, sendInfo, contactFormData }) {
    return (
        <section>
            
            <form className={style.contactForm} onSubmit={sendInfo()}>

                <h3 >Formulario de contacto</h3>

                <table className={style.contactFormTable}>
                    <tbody>
                        <tr>
                            <td colSpan="2" className={style.tituloCelda}><label htmlFor="name">Nombre<span className={style.required}>*</span></label></td>
                        </tr>

                        <tr>
                            <td><input type="text" id="name" name="name" value={contactFormData.name} onChange={handleInput} className={style.datosCelda} placeholder="Nombre" required /> </td>
                            <td><input type="text" id="surname" name="surname" value={contactFormData.surname} onChange={handleInput} className={style.datosCelda} placeholder="Apellidos" /> </td>
                        </tr>

                        <tr>
                            <td colSpan="2" className={style.tituloCelda}><label htmlFor="email">Correo electrónico<span className={style.required}>*</span></label></td>
                        </tr>

                        <tr>
                            <td colSpan="2" ><input type="email" id="email" value={contactFormData.email} onChange={handleInput} name="email" className={`${style.datosCelda} ${style.contactEmail}`} placeholder="Introduce tu mejor email" required /> </td>
                        </tr>

                        <tr>
                            <td colSpan="2" className={style.tituloCelda}><label htmlFor="help">¿En qué te podemos ayudar?<span className={style.required}>*</span></label></td>
                        </tr>

                        <tr>
                            <td colSpan="2"><textarea id="help" value={contactFormData.helpText} onChange={handleInput} name="helpText" className={`${style.datosCelda} ${style.helpText}`}
                                placeholder="Déjanos tus comentarios, preguntas o sugerencias" rows="5" maxLength="2000" required></textarea></td>
                        </tr>

                        <tr>
                            <td colSpan="2"><input type="submit" id="enviarFormContacto" className={style.btnSendMsg} value="Enviar" /> </td>
                        </tr>

                    </tbody>

                </table>

            </form>

        </section>
    )
}
