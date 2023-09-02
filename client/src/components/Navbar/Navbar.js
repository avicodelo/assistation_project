//SETS THE NAVBAR FORMAT

//CSS and images imports
import style from "./Navbar.module.css";
import image from "../../images/logo-assistation.png"

//React imports
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

export default function Navbar() {

    //Const settings
    const userID = localStorage.getItem("userID");
    const [loged, setLoged] = useState(false)
    const [menuActive, setMenuActive] = useState(false) //User menu
    const [reducedMenuActive, setReducedMenuActive] = useState(false) //Options menu

    //Detects if the user is logged
    const checkLoged = () => {
        if (localStorage.getItem("accesstoken")) {
            setLoged(true)
        } else {
            setLoged(false)
        }
    }

    //Sets a listener on the document to detect where the user is clicking
    useEffect(() => {
        document.addEventListener("click", manageMenu())
        document.addEventListener("click", changeReducedMenu())
    }, [])

    //Opens or closes the user menu depending on the status
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

    //opens or closes the option menu depending on the status (<800px format)
    const changeReducedMenu = () => {
        return (e) => {
            e.stopPropagation()
            if (e.target.className !== "fa-solid fa-bars navbar") {
                setReducedMenuActive(false)

            } else {
                setReducedMenuActive(!reducedMenuActive)

            }
        }
    }

    return (
        <div className={style.navBody}>
            <nav className={style.navbarMain} onLoad={checkLoged} >

                <div className={style.logoDiv}>
                    <NavLink className={`${style.navRouterLeft} ${style.quitDecoration}`} to="/">
                        <div className={style.homeDiv}>
                            <img src={image} className={style.logo} width="150px" alt="assistation" />

                        </div>
                    </NavLink>
                </div>

                <div className={style.navLinks}>

                    <NavLink className={(navData) => navData.isActive ? style.isActive : style.navRouter} to="/servicesSearcher"><h4 /* className={!loged && style.hideItem} */>Buscar Servicio</h4></NavLink>
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

                {/* Small screens */}
                <div className={style.reducedMenu}>
                    <div className={loged ? style.navRouter : style.hideItem} id="userMenu" >
                        <i className="fa-solid fa-user check" onClick={manageMenu()}></i>
                        <UserMenu userID={userID} menuActive={menuActive} />
                    </div>
                    <i className="fa-solid fa-bars navbar" onClick={changeReducedMenu()}></i>
                </div>
            </nav>

            {/* Small screens */}
            {reducedMenuActive &&
                <div className={style.reducedLinks}>
                    <div className={style.generalLinks}>
                        <NavLink className={(navData) => navData.isActive ? style.isActive : style.navRouter} to="/servicesSearcher"><h4>Buscar Servicio</h4></NavLink>
                        <NavLink className={(navData) => navData.isActive ? style.isActive : style.navRouter} to="/contacto"><h4>Contacto</h4></NavLink>
                    </div>
                    <div className={style.buttonLinks}>
                        <NavLink className={loged ? style.hideItem : style.navRouter} to="/login/">
                            <button className={style.reducedButton}><h4>Iniciar Sesión</h4></button>
                        </NavLink>
                        <NavLink className={loged ? style.hideItem : style.navRouter} to="/registro/">
                            <button className={style.invertedReducedButton}><h4>Registrarse</h4></button>
                        </NavLink>
                    </div>
                </div>}
        </div>
    )
}
