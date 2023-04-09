//MAIN PAGE

//CSS and image imports
import style from "./Home.module.css";

//Component imports
import Navbar from "../../components/Navbar/Navbar";
import Separator from "../../components/Separator/Separator";
import Footer from "../../components/Footer/Footer";

//React imports
import { NavLink, useNavigate } from "react-router-dom";

export default function Home() {
  //Starting always at top
  window.scroll(0,0);

  //Const sets
  const navigate= useNavigate();

  //Function: go to contact page
  const clickHandle = () =>{
    return () => {
      navigate(`/contacto`);
    }
  }

  return (
    <div>
      
      <Navbar />

      <section className={style.mainSection}>

        <div className={style.mainDiv}>

          <h1 className={style.mainTitle}>APROVECHA TU TIEMPO LIBRE, NO LO MALGASTES EN LAS TAREAS DE CASA</h1>
          <h3 className={style.callToAct}>TODO LO QUE NECESITAS A UN CLICK</h3>
          <NavLink to="/registro"><button className={style.btnHome}>REGISTRARSE</button></NavLink>

        </div>

      </section>

      <section className={style.section}>

        <h1>¿QUÉ OFRECEMOS?</h1>
        <Separator />
        <h2 className={style.infoP}>
          ASSISTATION es una plataforma polivalente, creada tanto para profesionales y particulares que quieran ofrecer sus servicios
          de ayuda a domicilio, como para aquellas personas que se quieran dedicar más tiempo a sí mismas.
        </h2>

      </section>

      <section className={style.section}>

        <h1>APTO PARA TODOS LOS PÚBLICOS</h1>
        <Separator />
        <h2 className={style.clasification}>PARTICULARES</h2>
        <h2 className={style.infoP}>
          Busca el servicio que necesites y ponte en contacto con los profesionales de tu zona para que te echen una mano
        </h2>
        <h2 className={style.clasification}>PROFESIONALES</h2>
        <h2 className={style.infoP}>
          Ofrece tus servicios con nosotros, ¡es muy sencillo!
        </h2>

      </section>

      <div className={style.questions}>

        <section className={style.section}>

          <h1>PREGUNTAS</h1>
          <Separator />
          <div className={style.divInsideQuest}>

            <h2 className={style.infoP}>
              Si aún sigues teniendo preguntas o hay algo que no te encaja, no te quedes
              con la duda, ponte en contacto con nosotros y te responderemos
              en menos de 24h
            </h2>
            <button className={style.btnHome} onClick={clickHandle()} >CONTACTO</button>

          </div>

        </section>

      </div>

      <Footer />

    </div>
  )
}
