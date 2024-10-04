//CSS imports
import style from "./SignUp.module.css";

//Component imports
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import SignUpNewUser from "../../components/SingUpNewUser/SignUpNewUser";

//React imports
import React from 'react'

export default function SignUp() {

    return (
        <div className={style.bodyOfSignPage}>

            <div>

                <Navbar />
                
                <SignUpNewUser />

            </div>

            <Footer />
        </div>
    )
}
