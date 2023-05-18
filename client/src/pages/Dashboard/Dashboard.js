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
import { createContext, useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useFetchUserData } from "../../Hooks/useFetchUserData";


//Context export
export const dashboardContext = createContext({})

export default function Dashboard() {
  //Const declarations
  const { pageRequired } = useParams();
  const [userData, userID, tokenValid] = useFetchUserData(URL_DASHBOARD)
  const [menuActive, setMenuActive] = useState(false)
  const navigate = useNavigate()

  //Function: manages data showed
  const showComponent = (pageRequired) => {
    if (pageRequired === "address") {
      return <UserAddress />

    } else if (pageRequired === "security") {
      return <UserSecurity />

    } else if (pageRequired === "service" && userData.role === "PROVIDER") {
      return <UserService />

    } else if (pageRequired === "remarks" && userData.role === "PROVIDER") {
      return <UserRemarks />

    } else if (pageRequired === "deleteUser") {
      return <UserDeletion />

    } else {
      return <UserPersonalInfo />
    }
  }

  useEffect(() => {
    document.addEventListener("click", manageDashboard())
  }, [])

  const manageDashboard = () => {
    return (e) => {
      e.stopPropagation()
      if (e.target.className !== "fa-solid fa-bars dashboard") {
        setMenuActive(false)

      } else {
        setMenuActive(!menuActive)
      }
    }
  }

  return (

    <div className={style.dashPage} >
      <Navbar />
      {
        tokenValid ?
          <div className={style.mainContainer}>
            <aside className={style.asideMenu}>
              <NavLink to={`${userID}/personalInfo`} ><h3>Perfil</h3></NavLink>
              <NavLink to={`${userID}/address`}><h3>Dirección</h3></NavLink>
              <NavLink to={`${userID}/security`}><h3>Seguridad</h3></NavLink>
              <NavLink to={`${userID}/service`} className={userData.role === "PROVIDER" ? style.showService : style.hide}><h3>Servicio</h3></NavLink>
              <NavLink to={`${userID}/remarks`} className={userData.role === "PROVIDER" ? style.showService : style.hide}><h3>Reseñas</h3></NavLink>
              <NavLink to={`${userID}/deleteUser`}><h3>Eliminar usuario</h3></NavLink>
            </aside>

            {/* small screens */}
            <i className="fa-solid fa-bars dashboard" onClick={manageDashboard()}></i>
            {menuActive &&
              <aside className={style.asideSmallMenu}>
                <NavLink to={`${userID}/personalInfo`} ><h3>Perfil</h3></NavLink>
                <NavLink to={`${userID}/address`}><h3>Dirección</h3></NavLink>
                <NavLink to={`${userID}/security`}><h3>Seguridad</h3></NavLink>
                <NavLink to={`${userID}/service`} className={userData.role === "PROVIDER" ? style.showService : style.hide}><h3>Servicio</h3></NavLink>
                <NavLink to={`${userID}/remarks`} className={userData.role === "PROVIDER" ? style.showService : style.hide}><h3>Reseñas</h3></NavLink>
                <NavLink to={`${userID}/deleteUser`}><h3>Eliminar usuario</h3></NavLink>
              </aside>
            }
            <dashboardContext.Provider value={userData} >
              {showComponent(pageRequired)}
            </dashboardContext.Provider>
          </div >
          :
          <div className={style.actionWrapper}>
            <h1 className={style.noLoginTitle}>La sesión ha caducado. Es necesario Iniciar Sesión</h1>
            <button onClick={() => { navigate("/login") }} className={style.goToLogin}>Iniciar sesión</button>
          </div>
      }
      <Footer />
    </div>
  )

}
