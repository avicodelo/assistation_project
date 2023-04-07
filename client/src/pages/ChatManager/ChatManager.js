import { useEffect, useState } from "react"
import ChatCard from "../../components/ChatCard/ChatCard"
import ChatWriter from "../../components/ChatWriter/ChatWriter"
import Navbar from "../../components/Navbar/Navbar"

import { URL_CHATS } from "../../settings/Settings"

export default function ChatManager() {

    const [chatList, setChatList] = useState([])
    const [chatID, setChatID] = useState("")


    useEffect(() => {
        const accessToken = localStorage.getItem("accesstoken")
        const setGetHeader = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
        }
        fetch(URL_CHATS, setGetHeader)
            .then(res => res.json())
            .then(chats => setChatList(chats.chatList))
    }, [])


    const goToChat = (id) => {
        setChatID(id)
    }
    return (
        <div>
            <Navbar />
            {
                chatList.map(({ participants, messages, _id }) => {

                    return (
                        <div key={_id} onClick={() => goToChat(_id)}>
                            <ChatCard participants={participants} messages={messages}
                            />
                        </div>
                    )
                })
            }
            <ChatWriter chatID={chatID} />
        </div>
    )
}
