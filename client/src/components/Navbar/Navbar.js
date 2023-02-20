//SETS THE NAVBAR FORMAT

//CSS and images imports
import style from "./Navbar.module.css";
import image from "../../images/vu-anh-TiVPTYCG_3E-unsplash.jpg"

//React imports
import { useState} from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    //Const sets
    const userID = localStorage.getItem("userID");
    const [loged, setLoged] = useState(false)

    const checkLoged=() => {
        if (localStorage.getItem("accesstoken")) {
            setLoged(true)
        } else {
            setLoged(false)
        }
    }

    return (
        <nav className={style.navbarMain} onLoad={checkLoged}>

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
                <NavLink className={loged ? (navData) => navData.isActive ? style.isActive : style.navRouter : style.hideItem} to={`/dashboard/${userID}`}><i className="fa-solid fa-user"></i></NavLink>

            </div>


        </nav>
    )
}
