//SEARCHER OF SERVICE PAGE

//Css imports
import style from "./ServicesSearcher.module.css"

//Components imports
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ProviderCard from "../../components/ProviderCard/ProviderCard";
import Filter from "../../components/Filter/Filter";
import { URL_PROVIDER } from "../../settings/Settings";

//React imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Hook imports
import { usePagination } from "../../Hooks/usePagination"

export default function ServicesSearcher() {

    //Const settings
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accesstoken")
    const initialFilterState = {
        "address.city": "",
        areaOfResponsibility: "",
        price: "",
        typeOfService: "",
        rates: ""
    };
    const initialCardState = {
        photo: "",
        name: "",
        surname: "",
        typeOfService: "",
        price: "",
        description: "",
        rates: ""
    };
    const [cardFiller, setCardFiller] = useState([]); //Manage user data to fill the Card
    const [orderSelector, setOrderSelector] = useState("&order=standard"); //Update the data in the order selector
    const [filterData, setFilterData] = useState(initialFilterState); //Update the data that has been introduced
    const [filterString, setFilterString] = useState(""); //Joins the thata introduced
    const [checkCustomer, setCheckCustomer] = useState(false)
    const [totalPages, setTotalPages] = useState(undefined)
    const [handlePage, pageState] = usePagination(totalPages)

    //Prepares the info to query format and sends it to URL
    const modifyFilter = () => {
        return (e) => {
            e.preventDefault();
            if (e.target.name === "filterForm") {
                const filterDataArray = Object.entries(filterData);
                setFilterString(filterDataArray
                    .filter(values => values[1] !== "")
                    .map(doubleData => doubleData.join("="))
                    .join("&"));

            } else if (e.target.type === "reset") {
                setFilterData(initialFilterState);
                setFilterString("");
                navigate("/servicesSearcher");

            } else {
                setOrderSelector(`&order=${e.target.value}`)
            }
            handlePage()
            window.scroll(0, 0);
        }
    }

    //GET data
    const setGetHeader = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    }

    useEffect(() => {

        //Fills the card variable with the filtered user info
        fetch(URL_PROVIDER + "?" + filterString + orderSelector + `&page=${pageState.page}`, setGetHeader)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Hay problemas con la información " + response.statusText);
            })
            .then(({ results, payload, totalPages }) => {

                if (payload?.role === "CUSTOMER") {
                    setCheckCustomer(true)
                }
                setCardFiller([]);
                setTotalPages(totalPages)
                results?.map(provider => setCardFiller(previousData => [...previousData, { ...initialCardState, ...provider }]))
            })
            .catch(() => {
                console.log("Ha habido un error")
            });

    }, [filterString, orderSelector, pageState?.page]);


    return (
        <div className={style.pageBody}>
            <Navbar />

            <div className={style.mainPageWrapper}>

                <div className={checkCustomer ? style.hide : style.noLoginWrapper}>
                    <div className={style.actionWrapper}>
                        <h1 className={style.noLoginTitle}>
                            Es necesario Iniciar Sesión como cliente
                        </h1>
                        <button onClick={() => { navigate("/login") }} className={style.goToLogin}>
                            Iniciar sesión
                        </button>
                    </div>
                </div>

                <div className={style.usersWrapper}>
                    <Filter modifyFilter={modifyFilter} filterData={filterData} setFilterData={setFilterData} />
                    <div className={style.mainContainer}>
                        <div className={style.cardsContainer}>
                            {
                                cardFiller.map((providerData) => {
                                    return (
                                        <ProviderCard key={providerData._id} providerData={providerData} />
                                    )
                                })
                            }
                        </div>
                        <div >
                            {totalPages !== 0 ?
                                <div className={style.pagination}>
                                    <button className={style.pageBut} onClick={() => { handlePage("DECREASE") }}>&larr;</button>
                                    <p className={style.pageNumber}>{pageState.page + " / " + totalPages}</p>
                                    <button className={style.pageBut} onClick={() => { handlePage("INCREASE") }}>&rarr;</button>
                                </div> :
                                <div className={style.noResults}>
                                    <h3>No se encontraron resultados</h3>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Footer />



        </div>

    )
}
