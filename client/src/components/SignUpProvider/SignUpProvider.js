//MANAGES SIGN UP CUSTOMER DATA

//React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import swal from "sweetalert";

//Component imports
import SignUpProviderStructure from "./SignUpProviderStructure";
import { URL_PROVIDER } from "../../settings/Settings";

//Hook imports
import { useCities } from "../../Hooks/useCities";


export default function SignUpProvider() {

  //Const settings
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

  //Updates customer data
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

  //Sends the info to server
  const saveProvider = () => {
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

        //Shows status of request
        fetch(URL_PROVIDER, addInfo)
          .then(response => response.json())
          .then(data => {
            if (data.error) {
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

          })

      } else {
        setValidator(false);
        window.scroll(0, 300);
      }
    }
  }

  return (
    <SignUpProviderStructure handleInput={handleInput} saveProvider={saveProvider}
      signUpData={signUpData} validator={validator} />
  )
}
