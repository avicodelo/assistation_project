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



export default function ServicesSearcher() {
    
    //Const declarations
    const initialCardState = {
        photo: "",
        name: "",
        surname: "",
        typeOfService: "",
        price: "10 €/h",
        description: "Hola, soy Vico",
        rates: "8.2"
    };

    const [cardFiller, setCardFiller] = useState([]); //Manage user data to fill the Card
    const [dataFromFilter, setDataFromFilter] = useState(""); //Data received from filter

    //Function: imports information from filter
    const importFromFilter = (dataArrayJoined) => {
        setDataFromFilter(dataArrayJoined);
    }

    //Function: fills the card variable with the filtered user info
    useEffect(() => {
        fetch(URL_PROVIDER + dataFromFilter)
            .then(response => response.json())
            .then(({ results }) => {
                setCardFiller([]);
                results?.map(provider => setCardFiller(previousData => [...previousData, { ...initialCardState, ...provider }]))
            });

    }, [dataFromFilter]);


    return (
        <div>
            <Navbar />
            <Filter importFromFilter={importFromFilter} />
            <div className={style.cardsContainer}>
                {
                    cardFiller.map((providerData) => {
                        return (
                            <ProviderCard key={providerData._id} providerData={providerData} />
                        )
                    })
                }
            </div>

            <Footer />
        </div>
    )
}
