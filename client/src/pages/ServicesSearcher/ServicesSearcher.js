//Css imports
import style from "./ServicesSearcher.module.css"

//Components imports
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ProviderCard from "../../components/ProviderCard/ProviderCard";

//React imports
import { useState, useEffect } from "react";


export default function ServicesSearcher() {
    //const declarations
    const URL_PROVIDER = "http://localhost:3002/providers?";
    const initialCardState = {
        photo: "",
        name: "",
        surname: "",
        typeOfService: "",
        price: "10€/h",
        description: "Hola, soy Vico",
        rates: "8.2"
    };

    const [cardFiller, setCardFiller] = useState([]);

    useEffect(() => {
        fetch(URL_PROVIDER)
            .then(response => response.json())
            .then(({ results }) => {
                setCardFiller([]);
                results.map(provider => setCardFiller(previousData => [...previousData, { ...initialCardState, ...provider }]))
            });

    }, []);


    return (
        <div>
            <Navbar />
            
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
