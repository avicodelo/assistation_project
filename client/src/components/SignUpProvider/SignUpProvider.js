//MANAGES SIGN UP CUSTOMER DATA

//React imports
import { useState } from "react";
import swal from "sweetalert";

//Component imports
import SignUpProviderStructure from "./SignUpProviderStructure";
import { URL_PROVIDER } from "../../settings/Settings";

export default function SignUpProvider() {

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
    street: "",
    number: "",
    flat: "",
    city: "",
    locality: "",
    country: "",
    postalCode: "",
    typeOfService: "",
  }

  const [signUpData, setSignUpData] = useState(initialStateSignUp); //User data variable
  const [validator, setValidator] = useState(true); //traffic light for passwords

  //Function: set min age as 16
  const minAge = () => {
    const today = new Date();
    const ageMil = 1000 * 3600 * 24 * 365 * 16;
    const ageAllowed = new Date(today.getTime() - ageMil);
    const dateFormated = [ageAllowed.getFullYear(), (ageAllowed.getMonth() + 1).toString().padStart(2, "0"), ageAllowed.getDate()].join("-");
    return dateFormated;
  }

  //Function: updates customer data
  const handleImput = (e) => {
    setSignUpData({ ...signUpData, ...{ [e.target.name]: e.target.value } });
  
    if (RegExp(/password/).test(e.target.name)) {
      setValidator(true)
    };

  }

//Function: sends the info to server
const saveProvider = () => {
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
      fetch(URL_PROVIDER, addInfo)
        .then(response => response.json())
        .then(data => {
          if (data.cause === "user error") {
            swal({
              text: "No se ha podido crear el usuario, inténtelo de nuevo",
              icon: "error",
              timer: "2000"
            });
          } else {
            swal({
              text: "Usuario creado correctamente",
              icon: "success",
              timer: "1500"
            });
            setSignUpData(initialStateSignUp);
          }

        }) /* Gestionar todas las validaciones*/

      /* redireccionar al login después del registro */
    } else {
      setValidator(false);
      window.scroll(0, 300);
    }
  }
}

return (
  <SignUpProviderStructure handleImput={handleImput} saveProvider={saveProvider}
    signUpData={signUpData} validator={validator} minAge={minAge} />
)
}
