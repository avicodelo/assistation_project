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
    
    //Function: Prepares the info to query format and sends it to URL
    const modifyFilter = () => {
        return (e) => {
            e.preventDefault();
            console.log(e.target.name);
            if (e.target.name === "filterForm") {
                const filterDataArray = Object.entries(filterData);
                console.log(filterDataArray, filterData);
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
            window.scroll(0,0);
        }

    }

    //Function: fills the card variable with the filtered user info
    useEffect(() => {

        fetch(URL_PROVIDER + dataArrayJoined + orderSelector)
            .then(response => response.json())
            .then(({ results }) => {
                setCardFiller([]);
                results?.map(provider => setCardFiller(previousData => [...previousData, { ...initialCardState, ...provider }]))
            });

    }, [dataArrayJoined, orderSelector]);


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
}
