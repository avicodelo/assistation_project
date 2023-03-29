//SEARCHER FILTER MANAGEMENT

//Css imports
import style from "./Filter.module.css";

//React imports
import { useState } from "react";


export default function Filter({ modifyFilter, filterData, setFilterData }) {

    //Const sets
    const [filterActive, setFilterActive] = useState(false) //Detects if the fields in form are active

    //Function: activates/deactivates filter div
    const changeFilter = () => {
        return () => {
            setFilterActive(!filterActive)
        }
    }

    //Function: Saves inputs in an object variable
    const handleInput = (e) => {
        setFilterData({ ...filterData, ...{ [e.target.name]: e.target.value } })
    }

    return (
        <div className={style.mainDivFilter}>
            <section className={style.filterOpener} onClick={changeFilter()}>
                <div className={style.icon}>
                    <i className={`fa-solid fa-plus ${filterActive ? style.hideFilter : style.showFilter}`}></i>
                    <i className={`fa-solid fa-minus ${filterActive ? style.showFilter : style.hideFilter}`}></i>
                </div>
                <p className={style.openerTitle}>Añadir filtros</p>
            </section>
            <div className={`${style.orderSelector} ${filterActive ? style.showFilter : style.hideFilter}`}>
                <label htmlFor="orderResults">Ordenar por : </label>
                <select name="orderResults" id="orderResults" onChange={modifyFilter()}>
                    <option value="standard">Más relevantes</option>
                    <option value="highPrice">Más caros</option>
                    <option value="lowPrice">Más económicos</option>
                    <option value="highRate">Nota más alta</option>
                    <option value="lowRate">Nota más baja</option>
                </select>
            </div>
            <form name="filterForm" className={`${style.filterSelections} ${filterActive ? style.showFilter : style.hideFilter}`} onSubmit={modifyFilter()}>
                <label htmlFor="filtCity">Ciudad</label>
                <input type="text" id="filtCity" name="address.city" onChange={handleInput} value={filterData["address.city"]} maxLength="50" placeholder="Ciudad" />

                {filterData["address.city"] ?
                    <div>
                        <label htmlFor="filtLocality">Localidad</label>
                        <input type="text" id="filtLocality" name="areaOfResponsibility" onChange={handleInput} value={filterData.areaOfResponsibility} maxLength="50" placeholder="Localidad" />
                    </div> :
                    <div></div>}

                <label htmlFor="filtPrice">Precio</label>
                <input type="number" id="filtPrice" name="price" onChange={handleInput} value={filterData.price} min="0" max="500" placeholder="Precio máximo" />

                <label htmlFor="filtService">Servicio</label>
                <select id="filtService" name="typeOfService" onChange={handleInput} value={filterData.typeOfService}>
                    <option value="">Todos los servicios</option>
                    <option value="Limpieza">Limpieza</option>
                    <option value="Cuidado de personas">Cuidado de personas</option>
                    <option value="Arreglos en casa">Arreglos en casa</option>
                </select>

                <label htmlFor="filtRate">Puntuación</label>
                <input type="number" id="filtRate" name="rates" min="0" max="10" onChange={handleInput} value={filterData.rates} placeholder="Puntuación mínima" />

                <button type="submit">Filtrar</button>
                <button type="reset" onClick={modifyFilter()}>Limpiar filtros</button>

            </form>

        </div>
    )

}