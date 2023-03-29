
//CSS imports

//React imports
import { useState, useEffect } from "react"

//Component imports
import RemarksCard from "../../components/RemarksCard/RemarksCard";
import ShareRemark from "../../components/ShareRemark/ShareRemark";
import { URL_DASHBOARD, URL_REMARKS } from "../../settings/Settings";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

//Hooks imports
import { useFetchUserData } from "../../Hooks/useFetchUserData"
import { usePagination } from "../../Hooks/usePagination"


export default function UserPublicPresentation() {

    const [userData, userID] = useFetchUserData(`${URL_DASHBOARD}public/`)
    const [remarks, setRemarks] = useState([])
    const [activateArea, setActivateArea] = useState(false)
    const [totalPages, setTotalPages] = useState(undefined)
    const [handlePage, pageState] = usePagination(totalPages)


    useEffect(() => {
        fetch(`${URL_REMARKS}/getRemarks/${userID}?page=${pageState.page}`)
            .then(res => res.json())
            .then(({ totalPages, results }) => {
                console.log(results, totalPages);
                setTotalPages(totalPages);
                results && results.length > 0 ?
                    setRemarks(results) :
                    setRemarks(undefined)
            })
    }, [pageState.page])

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
                        <div>
                            {
                                remarks.map((remark, index) => {
                                    return (
                                        <RemarksCard key={remark.title + index} remark={remark} />
                                    )
                                })
                            }
                            <div>
                                <button onClick={() => { handlePage("DECREASE") }}>&larr;</button>
                                <p>{pageState.page + "/" + totalPages}</p>
                                <button onClick={() => { handlePage("INCREASE") }}>&rarr;</button>
                            </div>

                        </div> :
                        <h2>Todavía no hay opiniones, ¡Anímate a dar la tuya!</h2>
                    ) :

                    <ShareRemark setActivateArea={setActivateArea} userID={userID} />
                }
            </div>

            <Footer />
        </div>
    )
}
