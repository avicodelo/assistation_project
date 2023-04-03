//CSS imports
import style from "./UserMenu.module.css"

//REACT imports
import { NavLink } from "react-router-dom"

export default function UserMenu({ userID, menuActive }) {

  const logout = () => {
    localStorage.removeItem("accesstoken")
    localStorage.removeItem("userID")
  }
  return (
    <div className={menuActive ? style.userMenuMain : style.hideItem}>

      <NavLink className={style.menuItem} to={`/dashboard/${userID}`}> Panel de control </NavLink>
      <NavLink className={style.menuItem} to={`/chatManager`}> Mensajes </NavLink>
      <NavLink className={style.menuItem} to="/login/" onClick={logout}> Cerrar sesión</NavLink>

    </div>
  )
}
