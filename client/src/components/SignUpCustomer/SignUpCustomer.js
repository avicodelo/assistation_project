

//React imports
import { useState } from "react";
import swal from "sweetalert";
import SignUpCustomerStructure from "./SignUpCustomerStructure";


//function exported
export default function SignUpCustomer() {
  const URL_CUSTOMER = "http://localhost:3002/customers";
  const initialStateSignUp = {
    name: "",
    surname: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    password: "",
    passwordRepeated: "",
    city: "",
    locality: "",
    postalCode: "",
  }

  const [signUpData, setSignUpData] = useState(initialStateSignUp);
  const [validator, setValidator] = useState(true);

  const handleImput = (e) => {
    setSignUpData({ ...signUpData, ...{ [e.target.name]: e.target.value } });
    if (RegExp(/password/).test(e.target.name)) {
      setValidator(true)
    }
  }

  const signUpCustomer = () => {
    return (e) => {
      e.preventDefault()
      if (signUpData.password === signUpData.passwordRepeated) {

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
              console.log(data.err);
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

        /* redireccionar al dashboard después del registro */
      } else {
        setValidator(false);
        window.scroll(0, 300);
      }
    }

  }

  return (
    <SignUpCustomerStructure handleImput={handleImput} signUpCustomer={signUpCustomer}
      signUpData={signUpData} validator={validator} />
  )
}
