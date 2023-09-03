//USER'S PUBLIC DATA PAGE

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

    //Const settings
    const navigate = useNavigate()
    const [userData, userID, tokenValid] = useFetchUserData(`${URL_DASHBOARD}public/`)
    const [remarks, setRemarks] = useState([])
    const [activateArea, setActivateArea] = useState(false)
    const [totalPages, setTotalPages] = useState(undefined)
    const [handlePage, pageState] = usePagination(totalPages)
    const accessToken = localStorage.getItem("accesstoken")

    useEffect(() => {
        //Gets the Provider remarks
        fetch(`${URL_REMARKS}/${userID}?page=${pageState.page}`)
            .then(res => res.json())
            .then(({ totalPages, results }) => {
                setTotalPages(totalPages);
                results && results.length > 0 ?
                    setRemarks(results) :
                    setRemarks(undefined)
            })
    }, [pageState.page, activateArea])

    //Creates-Opens a chat with user
    const openChat = () => {
        return () => {
            //POST data
            const postInfo = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify()
            }

            //Manages the chat
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

            {tokenValid ?
                <div className={style.generalContainer}>

                    <div className={style.serviceInfoWrapper}>

                        <h3>{userData?.typeOfService}</h3>
                        <div className={style.serviceSpecifics}>
                            <h3>{userData?.price} €/h</h3>
                            <h3 className={style.rate}>{userData.rates?.length > 0 ?
                                parseFloat(userData.rates.reduce((suma, nextRate) => suma + nextRate, 0) / userData.rates.length).toFixed(1) :
                                "-"}
                                <i className="fa-solid fa-star"></i></h3>
                        </div>
                        <button onClick={openChat()} className={style.stdBtn}>Enviar mensaje</button>

                    </div>
                    <div className={style.mainWrapper}>

                        <div className={style.userWrapper}>


                            <img src={SERVER_HOST + userData?.photo} className={style.avatarImg} alt="" width="100" />

                            <div className={style.personalInfoWrapper}>
                                <p><span>Nombre: </span>{userData?.name + " " + userData?.surname}</p>
                                <p><span>Edad: </span>{userData.dateOfBirth && parseInt((Date.now() - (new Date(userData.dateOfBirth)).getTime()) / (1000 * 3600 * 24 * 365))}</p>
                                <p><span>Ciudad: </span>{userData.address?.city}</p>
                                <p><span>Población: </span>{userData.address?.locality}</p>

                            </div>


                        </div>
                        <div className={style.descriptionWrapper}>
                            <h3>Descripción: </h3>
                            <p>{userData?.description}</p>
                        </div>
                    </div>
                    <div className={style.opinionsContainer}>

                        <div className={style.remarksWrapper}>
                            <div className={style.flex}>
                                <div className={style.opinionsTitle}>
                                    <h3>Opiniones</h3>
                                    <p className={style.rate}>{userData.rates?.length > 0 ?
                                        parseFloat(userData.rates.reduce((suma, nextRate) => suma + nextRate, 0) / userData.rates.length).toFixed(1) :
                                        "-"}
                                        <i className="fa-solid fa-star"></i></p>
                                </div>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setActivateArea(true)
                                }} className={style.stdBtn}>Añadir comentario</button>
                            </div>
                            {!activateArea ?

                                (remarks ?
                                    <div className={style.remarksCard}>
                                        {
                                            remarks.map((remark, index) => {
                                                return (
                                                    <RemarksCard key={remark.title + index} remark={remark} />
                                                )
                                            })
                                        }
                                        <div className={style.pagination}>
                                            <button className={style.pageBut} onClick={() => { handlePage("DECREASE") }}>&larr;</button>
                                            <p className={style.pageNumber}>{pageState.page + "/" + totalPages}</p>
                                            <button className={style.pageBut} onClick={() => { handlePage("INCREASE") }}>&rarr;</button>
                                        </div>

                                    </div> :
                                    <p className={style.noRemarks}>Todavía no hay opiniones, ¡Anímate a dar la tuya!</p>
                                ) :

                                <ShareRemark setActivateArea={setActivateArea} userID={userID} />
                            }

                        </div>
                    </div>

                </div>
                :

                <div className={style.bodyNoLogin}>
                    <div className={style.noLoginWrapper}>
                        <div className={style.actionWrapper}>
                            <h2 className={style.noLoginTitle}>
                                La sesión ha caducado, es necesario iniciar sesión
                            </h2>
                            <button onClick={() => { navigate("/login") }} className={style.goToLogin}>
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                </div>

            }


            <Footer />
        </div>
    )
}
