//CSS imports
import style from "./Dashboard.module.css"

//Component imports

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import UserPersonalInfo from "../../components/UserPersonalInfo/UserPersonalInfo";
import UserAddress from "../../components/UserAddress/UserAddress";
import UserSecurity from "../../components/UserSecurity/UserSecurity";
import UserService from "../../components/UserService/UserService";
import UserRemarks from "../../components/UserRemarks/UserRemarks";
import UserDeletion from "../../components/UserDeletion/UserDeletion";
import { URL_DASHBOARD } from "../../settings/Settings";

//React imports
import { createContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useFetchUserData } from "../../Hooks/useFetchUserData";


//Context export
export const dashboardContext = createContext({})

export default function Dashboard() {
  //Const declarations
  const { pageRequired } = useParams();
  const [userData, userID, tokenValid] = useFetchUserData(URL_DASHBOARD)
  const navigate = useNavigate()



  if (tokenValid) {
    //Function: manages data showed
    const showComponent = (pageRequired) => {
      if (pageRequired === "address") {
        return <UserAddress />

      } else if (pageRequired === "security") {
        return <UserSecurity />

      } else if (pageRequired === "service") {
        return <UserService userData={userData}/>

      } else if (pageRequired === "remarks") {
        return <UserRemarks />

      } else if (pageRequired === "deleteUser") {
        return <UserDeletion />

      } else {
        return <UserPersonalInfo />
      }
    }

    return (
      <div>
        <Navbar />
        <div className={style.mainContainer}>
          <aside className={style.asideMenu}>
            <NavLink to={`${userID}/personalInfo`} ><h3>Información personal</h3></NavLink>
            <NavLink to={`${userID}/address`}><h3>Dirección</h3></NavLink>
            <NavLink to={`${userID}/security`}><h3>Seguridad</h3></NavLink>
            <NavLink to={`${userID}/service`} className={userData.role === "PROVIDER" ? style.showService : style.hide}><h3>Servicio</h3></NavLink>
            <NavLink to={`${userID}/remarks`}><h3>Reseñas</h3></NavLink>
            <NavLink to={`${userID}/deleteUser`}><h3>Eliminar usuario</h3></NavLink>

          </aside>

          <dashboardContext.Provider value={userData} >
            {showComponent(pageRequired)}
          </dashboardContext.Provider>
        </div>
        <Footer />

      </div>
    )
  } else {
    return (
      <div>
        <h1>La sesión ha caducado. Es necesario Iniciar Sesión</h1>
        <button onClick={() => { navigate("/login") }}>Iniciar sesión</button>
      </div>
    )
  }
}
