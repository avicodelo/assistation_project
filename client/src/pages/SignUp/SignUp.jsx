//CSS imports
import style from "./SignUp.module.css";

//Component imports
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import SignUpCustomer from '../../components/SignUpCustomer/SignUpCustomer'
import SignUpProvider from '../../components/SignUpProvider/SignUpProvider'

//React imports
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'


export default function SignUp() {
    //Const declarations
    const { typeUser } = useParams();

    //Function: chooses type of sign up
    const selectSignUp = (typeUser) => {
        if (typeUser === "signUpCustomer") {
            return <SignUpCustomer />
        } else if (typeUser === "signUpProvider") {
            return <SignUpProvider />
        }
    };

    return (
        <div className={style.bodyOfSignPage}>

            <div>

                <Navbar />
                <p className={style.explanationTxt}>¿Con qué perfil te quieres registrar?</p>
                <section className={style.mainSection}>
                    <NavLink className={(link) => link.isActive ? style.linkIsActive : style.commonLink} to="/registro/signUpCustomer">
                        <h3>CLIENTE</h3>
                    </NavLink>
                    <NavLink className={(link) => link.isActive ? style.linkIsActive : style.commonLink} to="/registro/signUpProvider">
                        <h3>PROFESIONAL</h3>
                    </NavLink>
                </section>

                {selectSignUp(typeUser)}

            </div>

            <Footer />
        </div>
    )
}
