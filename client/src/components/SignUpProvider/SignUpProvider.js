//MANAGES SIGN UP CUSTOMER DATA

//React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import swal from "sweetalert";

//Component imports
import SignUpProviderStructure from "./SignUpProviderStructure";
import { URL_PROVIDER } from "../../settings/Settings";

import { useCities } from "../../Hooks/useCities";


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
  const navigate = useNavigate()
  const city = useCities(signUpData.postalCode)

  //Function: updates customer data
  const handleInput = (e) => {
    if (e.target.name === "postalCode") {
      setSignUpData({ ...signUpData, ...{ [e.target.name]: e.target.value, city: city } });
    } else {
      setSignUpData({ ...signUpData, ...{ [e.target.name]: e.target.value } });
    }

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
              setTimeout(() => { navigate("/login") }, 1500)
              setSignUpData(initialStateSignUp);
            }

          }) /* Gestionar todas las validaciones*/

      } else {
        setValidator(false);
        window.scroll(0, 300);
      }
    }
  }

  return (
    <SignUpProviderStructure handleInput={handleInput} saveProvider={saveProvider}
      signUpData={signUpData} validator={validator}/>
  )
}
