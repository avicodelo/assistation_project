//CSS imports
import style from "./SignUpNewUser.module.css"

//React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

//Setting imports
import { URL_CUSTOMER } from "../../settings/Settings";
import { URL_PROVIDER } from "../../settings/Settings";

//Hook imports
import { useMinAge } from "../../Hooks/useMinAge";
import { useCities } from "../../Hooks/useCities";
import usePagination from "../../Hooks/usePagination";

export default function SignUpNewUser() {

    //Const settings
    const initialStateSignUp = {
        name: "",
        surname: "",
        dateOfBirth: "",
        nationality: "",
        phone: "",
        city: "",
        postalCode: "",
        role: "",
        typeOfService: "",
        email: "",
        password: "",
        passwordRepeated: ""
    }

    const minAge = useMinAge()
    const [signUpData, setSignUpData] = useState(initialStateSignUp); //User data variable
    const [validator, setValidator] = useState(true); //traffic light for passwords
    const navigate = useNavigate()
    const city = useCities(signUpData.postalCode)
    const [handlePage, pageState] = usePagination(3)

    //Updates customer data and check the password
    const handleInput = (e) => {
        if (e.target.name === "postalCode") {
            setSignUpData({ ...signUpData, ...{ [e.target.name]: e.target.value, city: city } });
        } else {
            setSignUpData({ ...signUpData, ...{ [e.target.name]: e.target.value } });
        }

        if (RegExp(/password/).test(e.target.name)) {
            setValidator(true)
        }
    }

    const nextStep = (order) => {
        handlePage(order)
    }

    //Sends the info to server
    const signUp = () => {
        return (e) => {
            e.preventDefault()

            //checks if passwords are equal
            if (signUpData.password === signUpData.passwordRepeated) {

                //POST data
                const addInfo = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(signUpData)
                };

                const URL_TO_USE = signUpData.role === "CUSTOMER" ? URL_CUSTOMER : URL_PROVIDER

                //Shows status of request
                fetch(URL_TO_USE, addInfo)
                    .then(response => response.json())
                    .then(data => {

                        if (data.error) {
                            swal({
                                text: "No se ha podido crear el usuario, inténtelo de nuevo",
                                icon: "error",
                                timer: "10000"
                            })
                        } else {
                            swal({
                                text: "Usuario creado correctamente",
                                icon: "success",
                                timer: "1500"
                            })
                            setTimeout(() => { navigate("/login") }, 1500)
                            setSignUpData(initialStateSignUp);
                        }

                    });

            } else {
                setValidator(false);
                window.scroll(0, 300);
            }
        }

    }

    if (pageState.page === 1) {

        return (
            <div className={`${style.generalDiv}`}>

                <p className={style.gapsRequired}>Los campos marcados <span className={style.required}>*</span> son obligatorios</p>

                <form className={style.signUpForm} onSubmit={() => nextStep("INCREASE")}>

                    <div className={style.aloneInfo}>
                        <label htmlFor="name">Nombre<span className={style.required}>*</span>:</label>
                        <input type="text" onChange={handleInput} value={signUpData.name} id="name" name="name" pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,3}" maxLength="50" placeholder='Nombre' required />
                    </div>

                    <div className={style.aloneInfo}>
                        <label htmlFor="surname">Apellidos:</label>
                        <input type="text" onChange={handleInput} value={signUpData.surname} id="surname" name="surname" pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,3}" maxLength="50" placeholder='Apellidos' />
                    </div>

                    <div className={style.aloneInfo}>
                        <label htmlFor="dateOfBirth">Fecha de nacimiento<span className={style.required}>*</span>:</label>
                        <input type="date" onChange={handleInput} value={signUpData.dateOfBirth} id="dateOfBirth" name="dateOfBirth" max={minAge} required />
                    </div>

                    <div className={style.aloneInfo}>
                        <label htmlFor="nationality">Nacionalidad:</label>
                        <input type="text" onChange={handleInput} value={signUpData.nationality} id="nationality" name="nationality" maxLength="50" placeholder="¿En qué país naciste?" />
                    </div>

                    <div className={style.aloneInfo}>
                        <label htmlFor="phone">Teléfono<span className={style.required}>*</span>:</label>
                        <input type="text" onChange={handleInput} value={signUpData.phone} id="phone" name="phone" pattern="^\+34[0-9]{9}"
                            placeholder='Teléfono (+34)' title="Es necesario añadir +34" required />
                    </div>

                    <div className={style.aloneInfo}>
                        <label htmlFor="postalCode">Código Postal<span className={style.required}>*</span>:</label>
                        <input type="text" onChange={handleInput} value={signUpData.postalCode} id="postalCode"
                            name="postalCode" pattern="[0-5][0-9]{4}" maxLength="5" placeholder='C.P.' autoComplete="off" required />
                    </div>

                    <div className={style.aloneInfo}>
                        <label htmlFor="city">Ciudad:</label>
                        <input type="text" onChange={handleInput} value={signUpData.city} id="city" name='city'
                            pattern="([a-zA-ZÀ-ÿ\u00E0-\u00FC\u00f1\u00d1]*\s?){1,}" maxLength="60" placeholder='Ciudad' disabled={signUpData.postalCode} />
                    </div>

                    <div className={style.btnContainer}>
                        <input className={style.btnSendSign} type="submit" value="Siguiente" />
                    </div>
                </form>

            </div>
        )
    } else if (pageState.page === 2) {
        return (
            <div className={`${style.generalDiv}`}>
                <form className={style.signUpForm} onSubmit={() => nextStep()}>
                    <div className={style.aloneInfo}>
                        <label htmlFor="role">Tipo de usuario<span className={style.required}>*</span>:</label>
                        <select name="role" id="role" onChange={handleInput} required>
                            <option value="" hidden>Elija el tipo de usuario</option>
                            <option value="CUSTOMER">Cliente</option>
                            <option value="PROVIDER">Profesional</option>
                        </select>
                    </div>

                    {signUpData.role === "PROVIDER" &&

                        <div className={style.aloneInfo}>
                            <label htmlFor="typeOfService">Servicio que presta<span className={style.required}>*</span>:</label>
                            <select name="typeOfService" id="typeOfService" onChange={handleInput} required>
                                <option value="" hidden>Elija el tipo de servicio</option>
                                <option value="Limpieza">Limpieza</option>
                                <option value="Cuidado de personas">Cuidado de personas</option>
                            </select>
                        </div>}

                    <div className={style.aloneInfo}>
                        <label htmlFor="email">Email<span className={style.required}>*</span>:</label>
                        <input type="email" onChange={handleInput} value={signUpData.email} id="email" name="email" maxLength="100" placeholder="Indica tu mejor email" required />
                    </div>

                    <p className={validator ? style.hideInfo : style.showInfo}>Las contraseñas no coinciden</p>

                    <div className={style.aloneInfo}>
                        <label htmlFor="password">Contraseña<span className={style.required}>*</span>:</label>
                        <input type="password" onChange={handleInput} value={signUpData.password} id="password" name="password" pattern=".{6,16}" placeholder='Contraseña (de 6 a 16 caracteres)' title="Entre 6 y 16 caracteres" required />
                    </div>

                    <div className={style.aloneInfo}>
                        <label htmlFor="passwordRepeated">Confirma contraseña<span className={style.required}>*</span>:</label>
                        <input type="password" onChange={handleInput} value={signUpData.passwordRepeated} id="passwordRepeated" name="passwordRepeated" placeholder='Repetir contraseña' required />
                    </div>

                    <div className={style.btnContainer}>

                        <input className={style.btnSendSign} type="button" value="Volver" onClick={() => nextStep("DECREASE")} />
                        <input className={style.btnSendSign} type="submit" value="Registrarse" onClick={signUp()} />
                    </div>

                </form>
            </div>
        )
    }


}