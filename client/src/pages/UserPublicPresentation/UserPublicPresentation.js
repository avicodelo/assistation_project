
//CSS imports

//React imports
import { useState, useEffect } from "react"

//Component imports
import RemarksCard from "../../components/RemarksCard/RemarksCard";
import ShareRemark from "../../components/ShareRemark/ShareRemark";
import { URL_DASHBOARD } from "../../settings/Settings";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

//Hooks imports
import { useFetchUserData } from "../../Hooks/useFetchUserData"


export default function UserPublicPresentation() {

    const [userData, userID] = useFetchUserData(`${URL_DASHBOARD}public/`)
    const [remarks, setRemarks] = useState([])
    const [activateArea, setActivateArea] = useState(false)


    useEffect(() => {
        userData.remarks && userData.remarks.length > 0 ?
            setRemarks(userData.remarks) :
            setRemarks(undefined)
    }, [userData.remarks])

    return (

        <div>
            <Navbar />

            <div>
                <p>{userData?.photo}</p>
                <p>{userData?.name}</p>
                <p>{userData?.surname}</p>
                <p>{userData.dateOfBirth && parseInt((Date.now() - (new Date(userData.dateOfBirth)).getTime()) / (1000 * 3600 * 24 * 365))}</p>
                <p>{userData?.tipeOfService}</p>
                <p>{userData?.price}</p>
                {<p>{userData.address?.city + ", " + userData.address?.locality}</p>}
                <p>{userData?.description}</p>
                <div>
                    <h2>Puntuación</h2>
                    <p>{userData.rates?.length > 0 ?
                        parseFloat(userData.rates.reduce((suma, nextRate) => suma + nextRate, 0) / userData.rates.length).toFixed(1) :
                        "Contribuye con la primera puntuación"}</p>
                </div>
            </div>
            <div>
                <h2>Opiniones</h2>
                <button onClick={(e) => {
                    e.preventDefault();
                    setActivateArea(true)
                }}>Añadir comentario</button>
                {!activateArea ?

                    (remarks ?

                        remarks.map((remark, index) => {
                            return (
                                <RemarksCard key={remark.title + index} remark={remark} />
                            )
                        }) :
                        <h2>Todavía no hay opiniones, ¡Anímate a dar la tuya!</h2>
                    ) :

                    <ShareRemark setActivateArea={setActivateArea} userID={userID} />
                }
            </div>

            <Footer />
        </div>
    )
}
