//Css imports
import style from "./ServicesSearcher.module.css"

//Components imports
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ProviderCard from "../../components/ProviderCard/ProviderCard";
import Filter from "../../components/Filter/Filter";

//React imports
import { useState, useEffect } from "react";
import { URL_PROVIDER } from "../../settings/Settings";
import { useNavigate } from "react-router-dom";



export default function ServicesSearcher() {

    //Const declarations
    const navigate = useNavigate();
    const initialFilterState = {
        "address.city": "",
        "address.locality" : "",
        price: "",
        typeOfService: "",
        rates: ""
    };

    const initialCardState = {
        photo: "",
        name: "",
        surname: "",
        typeOfService: "",
        price: "10",
        description: "",
        rates: "8.2"
    };

    const [cardFiller, setCardFiller] = useState([]); //Manage user data to fill the Card
    const [orderSelector, setOrderSelector] = useState("&order=standard"); //Update the data in the order selector
    const [filterData, setFilterData] = useState(initialFilterState); //Update the data that has been introduced
    const [dataArrayJoined, setDataArrayJoined] = useState(""); //Joins the thata introduced
    const [checkCustomer, setCheckCustomer] = useState(false)

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

        fetch(URL_PROVIDER + "?" + dataArrayJoined + orderSelector, setGetHeader)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Hay problemas con la información " + response.statusText);
            })
            .then(({ results, payload }) => {
                if (payload.userDB.role === "CUSTOMER") {
                    setCheckCustomer(true)
                }
                setCardFiller([]);
                results?.map(provider => setCardFiller(previousData => [...previousData, { ...initialCardState, ...provider }]))
            })
            .catch((error) => {
                console.log(error)

            });

    }, [dataArrayJoined, orderSelector]);

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
