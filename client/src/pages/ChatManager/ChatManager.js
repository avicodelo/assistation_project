//CSS import
import style from "./ChatManager.module.css"

//React imports
import { useEffect, useState } from "react"

//Component imports
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import ChatCard from "../../components/ChatCard/ChatCard"
import ChatWriter from "../../components/ChatWriter/ChatWriter"
import { URL_CHATS } from "../../settings/Settings"

export default function ChatManager() {

    const urlQuery = new URLSearchParams(window.location.search)
    const [chatList, setChatList] = useState([])
    const [chatID, setChatID] = useState(urlQuery.has("chat") ? urlQuery.get("chat") : null)
    const [plugToFetch, setPlugToFetch] = useState(true)

    useEffect(() => {
        document.addEventListener("click", manageFetch())
    }, [])

    useEffect(() => {
        const accessToken = localStorage.getItem("accesstoken")

        const setGetHeader = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        }
        fetch(URL_CHATS, setGetHeader)
            .then(res => res.json())
            .then(chats => {
                window.history.replaceState({}, "", window.location.pathname);
                setChatList(chats.chatList)
            })

        console.log("rendering");
    }, [plugToFetch])

    const manageFetch = () => {
        return () => {
            setPlugToFetch(!plugToFetch)
        }
    }

    const goToChat = (id) => {
        setChatID(id)
    }
    return (
        <div className={style.pageBody}>
            <Navbar />
            <div className={style.chatWrapper}>
                <div className={style.listWrapper}>
                    {
                        chatList.map(({ participants, messages, _id }) => {

                            return (
                                <div className={style.userWrapper} key={_id} onClick={() => goToChat(_id)}>
                                    <ChatCard participants={participants} messages={messages} />
                                </div>
                            )
                        })
                    }
                </div>
                <ChatWriter chatID={chatID} />
            </div>
            <Footer />
        </div>
    )
}
