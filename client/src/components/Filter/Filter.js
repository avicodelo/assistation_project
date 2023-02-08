//SEARCHER FILTER MANAGEMENT

//Css imports
import style from "./Filter.module.css";

//React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Filter({ importFromFilter }) {

    //Const sets
    const navigate = useNavigate();
    const initialFilterState = {
        "address.city": "",
        price: "",
        typeOfService: "",
        rates: "",
        minRate: ""
    };

    const [filterActive, setFilterActive] = useState(false) //Detects if the fields in form are active
    const [filterData, setFilterData] = useState(initialFilterState); //Update the data that has been introduced

    //Function: activates/deactivates filter div
    const changeFilter = () => {
        return (e) => {
                setFilterActive(!filterActive)
        }
    }

    //Function: Saves inputs in an object variable
    const handleInput = (e) => {
        setFilterData({ ...filterData, ...{ [e.target.name]: e.target.value } })

    }

    //Function: Prepares the info to query format and sends it to URL
    const activateSearch = () => {
        return (e) => {
            e.preventDefault();
            const filterDataArray = Object.entries(filterData);
            const dataArrayJoined = filterDataArray
                .filter(values => values[1] !== "")
                .map(doubleData => doubleData.join("="))
                .join("&");
            navigate(`?${dataArrayJoined}`)
            importFromFilter(dataArrayJoined);
        }
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
            <form className={`${style.filterSelections} ${filterActive ? style.showFilter : style.hideFilter}`}>
                <label htmlFor="filtCity">Ciudad</label>
                <input type="text" id="filtCity" name="address.city" onChange={handleInput} value={filterData.city} placeholder="Ciudad" />

                <label htmlFor="filtPrice">Precio</label>
                <input type="number" id="filtPrice" name="price" onChange={handleInput} value={filterData.maxPrice} placeholder="Precio máximo" />

                <label htmlFor="filtService">Servicio</label>
                <select id="filtService" name="typeOfService" onChange={handleInput} value={filterData.typeOfService}>
                    <option value="">Todos los servicios</option>
                    <option value="Limpieza">Limpieza</option>
                    <option value="Cuidado de personas">Cuidado de personas</option>
                    <option value="Arreglos en casa">Arreglos en casa</option>
                </select>

                <label htmlFor="filtRate">Puntuación</label>
                <input type="number" id="filtRate" name="rates" onChange={handleInput} value={filterData.maxRate} placeholder="Puntuación mínima" />

                <button type="submit" onClick={activateSearch()}>Filtrar</button>
            </form>

        </div>
    )
}
