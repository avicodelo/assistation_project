//Css imports
import style from "./ServicesSearcher.module.css"

//Components imports
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ProviderCard from "../../components/ProviderCard/ProviderCard";
import Filter from "../../components/Filter/Filter";

//React imports
import { useState, useEffect, useReducer } from "react";
import { URL_PROVIDER } from "../../settings/Settings";
import { useNavigate } from "react-router-dom";



export default function ServicesSearcher() {

    //Const declarations
    const navigate = useNavigate();
    const initialFilterState = {
        "address.city": "",
        "address.locality": "",
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
    const [dataArrayJoined, setDataArrayJoined] = useState(""); //Joins the thata introduced
    const [checkCustomer, setCheckCustomer] = useState(false)
    const [totalPages, setTotalPages] = useState(undefined)

    const reducer = (state, action) => {
        if (action.type === "INCREASE") {
            return { page: state.page + 1 }
        } else if (action.type === "DECREASE") {
            return { page: state.page - 1 }
        } else {
            return { page: 1 }
        }
    }

    const [pageState, dispatch] = useReducer(reducer, { page: 1 })

    const handlePage = (order) => {
        if (order === "INCREASE" && pageState.page < totalPages) {
            dispatch({ type: order })
        } else if (order === "DECREASE" && pageState.page > 1) {
            dispatch({ type: order })
        }
    }
    
    //Function: Prepares the info to query format and sends it to URL
    const modifyFilter = () => {
        return (e) => {
            e.preventDefault();
            if (e.target.name === "filterForm") {
                const filterDataArray = Object.entries(filterData);
                setDataArrayJoined(filterDataArray
                    .filter(values => values[1] !== "")
                    .map(doubleData => doubleData.join("="))
                    .join("&"));

            } else if (e.target.type === "reset") {
                setFilterData(initialFilterState);
                setDataArrayJoined("");
                navigate("/servicesSearcher");


            } else {
                setOrderSelector(`&order=${e.target.value}`)
            }
            dispatch({ type: "RESET" })
            window.scroll(0, 0);
        }

    }

    //Auth info
    const accessToken = localStorage.getItem("accesstoken")
    const setGetHeader = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    }

    //Function: fills the card variable with the filtered user info
    useEffect(() => {

        fetch(URL_PROVIDER + "?" + dataArrayJoined + orderSelector + `&page=${pageState.page}`, setGetHeader)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Hay problemas con la información " + response.statusText);
            })
            .then(({ results, payload, totalPages }) => {

                if (payload.userDB.role === "CUSTOMER") {
                    setCheckCustomer(true)
                }
                setCardFiller([]);
                setTotalPages(totalPages)
                results?.map(provider => setCardFiller(previousData => [...previousData, { ...initialCardState, ...provider }]))
            })
            .catch((error) => {
                console.log(error)

            });

    }, [dataArrayJoined, orderSelector, pageState?.page]);

    if (checkCustomer) {
        return (
            <div>
                <Navbar />

                <div>
                    <Filter modifyFilter={modifyFilter} filterData={filterData} setFilterData={setFilterData} />
                    <div className={style.cardsContainer}>
                        {
                            cardFiller.map((providerData) => {
                                return (
                                    <ProviderCard key={providerData._id} providerData={providerData} />
                                )
                            })
                        }
                    </div>
                    <div>
                        <button onClick={() => { handlePage("DECREASE") }}>&larr;</button>
                        <p>{pageState.page + "/" + totalPages}</p>
                        <button onClick={() => { handlePage("INCREASE") }}>&rarr;</button>
                    </div>
                </div>

                <Footer />
            </div>
        )
    } else {
        return (
            <div>
                <Navbar />
                <h1>Es necesario Iniciar Sesión como cliente</h1>
            </div>
        )
    }
}
