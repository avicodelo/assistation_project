//SETS THE FOOTER FORMAT

//CSS imports
import style from "./Footer.module.css";

//React imports
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <div >
      <section className={style.mainFooter}>
        <div className={style.footerLinks}>
          <NavLink className={style.navRouterFooter} to="/"><h5>BUSCA AYUDA</h5></NavLink>
          <NavLink className={style.navRouterFooter} to="/contacto"><h5>CONTACTO</h5></NavLink>
        </div>

        <div className={style.footerCopyright}>
          <p>&copy; Assistation 2023</p>
        </div>
      </section>
    </div>
  )
}
