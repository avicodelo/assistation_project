//CONTACT PAGE

//CSS imports
import style from "./Contact.module.css";

//Components imports
import ContactForm from '../../components/ContactForm/ContactForm'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'

//React imports
import React from 'react'

export default function Contacto() {
    //Starting always at top
    window.scroll(0, 0);

    return (
        <div>
            <Navbar />
            <section className={style.introduction}>

                <h1>CONTÁCTANOS</h1>

            </section>

            <ContactForm />
            
            <Footer />
        </div>
    )
}
