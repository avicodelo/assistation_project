//PAGE WHERE IS THE CHAT

//CSS import
import style from "./ChatManager.module.css"

//React imports
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

//Component imports
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import ChatCard from "../../components/ChatCard/ChatCard"
import ChatWriter from "../../components/ChatWriter/ChatWriter"
import { URL_CHATS } from "../../settings/Settings"

export default function ChatManager() {

    //Const settings
    const urlQuery = new URLSearchParams(window.location.search)
    const accessToken = localStorage.getItem("accesstoken")
    const navigate = useNavigate()
    const [chatList, setChatList] = useState([])
    const [chatID, setChatID] = useState(urlQuery.has("chat") ? urlQuery.get("chat") : null)
    const [plugToFetch, setPlugToFetch] = useState(true)

    //Listener on document to update chat
    useEffect(() => {
        document.addEventListener("click", manageFetch())
    }, [])

    useEffect(() => {

        //GET data
        const setGetHeader = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        }
        //Update the list of chats
        fetch(URL_CHATS, setGetHeader)
            .then(res => res.json())
            .then(chats => {
                window.history.replaceState({}, "", window.location.pathname);
                setChatList(chats.chatList)

            })

    }, [plugToFetch])

    //Changes the var's value when document is clicked (updates page)
    const manageFetch = () => {
        return () => {
            setPlugToFetch(!plugToFetch)
        }
    }

    //Searches the chat with a specific ID and shows it
    const goToChat = (id) => {
        setChatID(id)
    }


    return (
        <div className={style.pageBody}>
            <Navbar />
            {
                !chatList ?

                    <div className={style.actionWrapper}>
                        <h1 className={style.noLoginTitle}>
                            La sesión ha caducado. Es necesario Iniciar Sesión
                        </h1>
                        <button onClick={() => { navigate("/login") }} className={style.goToLogin}>
                            Iniciar sesión
                        </button>
                    </div>


                    :
                    <div className={style.chatWrapper}>
                        <div className={style.listWrapper}>
                            { chatList.length > 0 ?
                                chatList.map(({ participants, messages, _id }) => {

                                    return (
                                        <div className={style.userWrapper} key={_id} onClick={() => goToChat(_id)}>
                                            <ChatCard participants={participants} messages={messages} />
                                        </div>
                                    )
                                })
                                : 
                                <div >
                                    <h2 >Todavía no tiene ninguna conversación abierta</h2>
                                </div>

                            }
                        </div>
                        <ChatWriter chatID={chatID} />
                    </div>
            }

            <Footer />
        </div>
    )
}
