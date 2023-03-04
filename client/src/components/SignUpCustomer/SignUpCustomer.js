//MANAGES SIGN UP CUSTOMER DATA

//React imports
import { useState } from "react";
import swal from "sweetalert";

//Component imports
import SignUpCustomerStructure from "./SignUpCustomerStructure";
import { URL_CUSTOMER } from "../../settings/Settings";

export default function SignUpCustomer() {

  //Const sets
  const initialStateSignUp = {
    name: "",
    surname: "",
    dateOfBirth: "",
    nationality: "",
    phone: "",
    email: "",
    password: "",
    passwordRepeated: "",
    street:"",
    number:"",
    flat:"",
    city: "",
    locality: "",
    country:"",
    postalCode: "",
  }

  const [signUpData, setSignUpData] = useState(initialStateSignUp); //User data variable
  const [validator, setValidator] = useState(true); //traffic light for passwords

  //Function: updates customer data
  const handleImput = (e) => {
    setSignUpData({ ...signUpData, ...{ [e.target.name]: e.target.value } });
    if (RegExp(/password/).test(e.target.name)) {
      setValidator(true)
    }
  }

  //Function: sends the info to server
  const signUpCustomer = () => {
    return (e) => {
      e.preventDefault()
      if (signUpData.password === signUpData.passwordRepeated) { //checks if passwords are equal

        //POST data
        const addInfo = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signUpData)
        };

        //Save new contact
        fetch(URL_CUSTOMER, addInfo)
          .then(response => response.json())
          .then(data => {
            
            if (data.cause === "user error") {
              swal({
                title: "No se ha podido crear el usuario", 
                text: data.err,
                icon: "error",
                timer: "10000"
              })
            } else {
              swal({
                text: "Usuario creado correctamente",
                icon: "success",
                timer: "1500"
              })
              setSignUpData(initialStateSignUp);
            }

          }); /* Gestionar todas las validaciones*/

        /* redireccionar al login después del registro */
      } else {
        setValidator(false);
        window.scroll(0, 300);
      }
    }

  }

  return (
    <SignUpCustomerStructure handleImput={handleImput} signUpCustomer={signUpCustomer}
      signUpData={signUpData} validator={validator}/>
  )
}
