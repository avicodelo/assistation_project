//MANAGES THE CONTACT INFO

//React imports
import { useState } from "react";
import ContactStructure from "./ContactStructure";
import swal from "sweetalert";

export default function ContactForm() {
    //Const sets
    const URL_CONTACTALONE = "http://localhost:3002/contactAlone";
    const initialStateContactForm = {
        name: "",
        surname: "",
        email: "",
        helpText: ""

    }

    const [contactFormData, setContactFormData] = useState(initialStateContactForm);

    //Function: Saves inputs in an object variable
    const handleInput = (e) => {
        setContactFormData({ ...contactFormData, ...{ [e.target.name]: e.target.value } })
    }

    //Function: Comunication with server when the info is sent
    const sendInfo = () => {
        return (e) => {
            e.preventDefault();

            //POST data
            const addInfo = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactFormData)
            };

            //Save new contact
            fetch(URL_CONTACTALONE, addInfo)
                .then(response => response.json())
                .then(data => {
                    setContactFormData(initialStateContactForm);
                    if (data.cause === "mailer fail") {
                        swal({
                            text: "El mensaje no se ha podido enviar, pruebe de nuevo más tarde",
                            icon: "error",
                            timer: "2000"
                        })
                    } else {
                        swal({
                            text: "Mensaje enviado correctamente",
                            icon: "success",
                            timer: "1500"
                        })
                    }

                });
        }
    }

    return (
        <div>
            <ContactStructure contactFormData={contactFormData} handleInput={handleInput} sendInfo={sendInfo}/>
        </div>
    )
}
