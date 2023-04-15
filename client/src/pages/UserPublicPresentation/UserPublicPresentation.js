//CSS imports
import style from "./UserPublicPresentation.module.css"

//React imports
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//Component imports
import RemarksCard from "../../components/RemarksCard/RemarksCard";
import ShareRemark from "../../components/ShareRemark/ShareRemark";
import { SERVER_HOST, URL_DASHBOARD, URL_REMARKS, URL_CHATS } from "../../settings/Settings";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

//Hooks imports
import { useFetchUserData } from "../../Hooks/useFetchUserData"
import { usePagination } from "../../Hooks/usePagination"


export default function UserPublicPresentation() {

    const navigate = useNavigate()
    const [userData, userID, tokenValid] = useFetchUserData(`${URL_DASHBOARD}public/`)
    const [remarks, setRemarks] = useState([])
    const [activateArea, setActivateArea] = useState(false)
    const [totalPages, setTotalPages] = useState(undefined)
    const [handlePage, pageState] = usePagination(totalPages)
    const accessToken = localStorage.getItem("accesstoken")

    useEffect(() => {
        fetch(`${URL_REMARKS}/getRemarks/${userID}?page=${pageState.page}`)
            .then(res => res.json())
            .then(({ totalPages, results }) => {
                setTotalPages(totalPages);
                results && results.length > 0 ?
                    setRemarks(results) :
                    setRemarks(undefined)
            })
    }, [pageState.page, activateArea])

    const openChat = () => {
        return () => {
            const postInfo = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify()
            }

            fetch(`${URL_CHATS}?sendTo=${userID}`, postInfo)
                .then(res => res.json())
                .then(({ chatExist, newChatID }) => {
                    navigate(`/chatManager?chat=${chatExist || newChatID}`)
                }
                )
        }
    }

    return (

        <div className={style.pageBody}>
            <Navbar />
            <div>
                {tokenValid ?
                    <div>
                        <div>
                            <img src={SERVER_HOST + userData?.photo} alt="" width="100" />
                            <button onClick={openChat()}>Enviar mensaje</button>
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
                    </div> :

                    <div className={style.bodyNoLogin}>
                        <div className={style.noLoginWrapper}>
                            <div className={style.actionWrapper}>
                                <h1 className={style.noLoginTitle}>
                                    La sesión ha caducado, es necesario iniciar sesión
                                </h1>
                                <button onClick={() => { navigate("/login") }} className={style.goToLogin}>
                                    Iniciar sesión
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <Footer />
        </div>
    )
}
