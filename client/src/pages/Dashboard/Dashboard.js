//CSS imports
import style from "./Dashboard.module.css"

//Component imports
import { URL_DASHBOARD } from "../../settings/Settings";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import UserPersonalInfo from "../../components/UserPersonalInfo/UserPersonalInfo";
import UserAddress from "../../components/UserAddress/UserAddress";
import UserSecurity from "../../components/UserSecurity/UserSecurity";
import UserService from "../../components/UserService/UserService";
import UserRemarks from "../../components/UserRemarks/UserRemarks";


//React imports
import { useState, useEffect, createContext } from "react";
import { NavLink, useParams } from "react-router-dom";

//Context export
export const dashboardContext = createContext({})


export default function Dashboard() {
  //Const declarations
  const { userID, infoRequired } = useParams();
  const [userData, setUserData] = useState([])

  //Fetch info
  useEffect(() => {
    fetch(URL_DASHBOARD + userID)
      .then(response => response.json())
      .then(({ result }) => {
        setUserData(result[0]);
      })
  }, [userID])

  //Function: manages data showed
  const showComponent = (infoRequired) => {
    if (infoRequired === "address") {
      return <UserAddress />

    } else if (infoRequired === "security") {
      return <UserSecurity />

    } else if (infoRequired === "service") {
      return <UserService />

    } else if (infoRequired === "remarks") {
      return <UserRemarks />

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
          <NavLink to={`${userID}/service`} className={userData.role ? style.showService : style.hide}><h3>Servicio</h3></NavLink>
          <NavLink to={`${userID}/remarks`}><h3>Comentarios</h3></NavLink>

        </aside>

        <dashboardContext.Provider value={userData} >
          {showComponent(infoRequired)}
        </dashboardContext.Provider>
      </div>
      <Footer />

    </div>
  )
}
