

//React imports
import { useState } from "react";
import swal from "sweetalert";
import SignUpProviderStructure from "./SignUpProviderStructure";

export default function SignUpProvider() {
  const URL_PROVIDER = "http://localhost:3002/providers";
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
    typeOfService: "",
  }

  const [signUpData, setSignUpData] = useState(initialStateSignUp)
  const [validator, setValidator] = useState(true);

  const handleImput = (e) => {
    setSignUpData({ ...signUpData, ...{ [e.target.name]: e.target.value } });
    if (RegExp(/password/).test(e.target.name)) {
      setValidator(true)
    }
  }

  const saveProvider = () => {
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

        /* redireccionar al dashboard después del registro */
      } else {
        setValidator(false);
        window.scroll(0, 300);
      }
    }
  }

  return (
    <SignUpProviderStructure handleImput={handleImput} saveProvider={saveProvider}
      signUpData={signUpData} validator={validator} />
  )
}
