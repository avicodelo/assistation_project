//SETS THE NAVBAR FORMAT

//CSS and images imports
import style from "./Navbar.module.css";
import image from "../../images/vu-anh-TiVPTYCG_3E-unsplash.jpg"

//React imports
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

export default function Navbar() {

    //Const sets
    const userID = localStorage.getItem("userID");
    const [loged, setLoged] = useState(false)
    const [menuActive, setMenuActive] = useState(false)

    const checkLoged = () => {
        if (localStorage.getItem("accesstoken")) {
            setLoged(true)
        } else {
            setLoged(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", manageMenu())
    }, [])

    const manageMenu = () => {
        return (e) => {
            e.stopPropagation()
            if (e.target.className !== "fa-solid fa-user check") {
                setMenuActive(false)

            } else {
                setMenuActive(!menuActive)
            }
        }
    }

    return (
        <nav className={style.navbarMain} onLoad={checkLoged} >

            <div className={style.logoDiv}>
                <NavLink className={`${style.navRouterLeft} ${style.quitDecoration}`} to="/">
                    <div className={style.homeDiv}>
                        <img src={image} width="60px" alt="assistation" />
                        <h3 className={style.slogan}>ASSISTATION</h3>
                    </div>
                </NavLink>
            </div>

            <div className={style.navLinks}>

                <NavLink className={(navData) => navData.isActive ? style.isActive : style.navRouter} to="/servicesSearcher"><h4>Buscar Servicio</h4></NavLink>
                <NavLink className={(navData) => navData.isActive ? style.isActive : style.navRouter} to="/contacto"><h4>Contacto</h4></NavLink>
                <NavLink className={loged ? style.hideItem : style.navRouter} to="/registro/">
                    <button className={style.invertedNavButton}><h4>Registrarse</h4></button>
                </NavLink>
                <NavLink className={loged ? style.hideItem : style.navRouter} to="/login/">
                    <button className={style.navButton}><h4>Iniciar Sesión</h4></button>
                </NavLink>

                <div className={loged ? style.navRouter : style.hideItem} id="userMenu" >
                    <i className="fa-solid fa-user check" onClick={manageMenu()}></i>
                    <UserMenu userID={userID} menuActive={menuActive} />
                </div>
            </div>

        </nav>
    )
}
