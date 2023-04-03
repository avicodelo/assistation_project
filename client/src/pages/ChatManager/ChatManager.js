import { useEffect, useState } from "react"
import ChatCard from "../../components/ChatCard/ChatCard"
import Navbar from "../../components/Navbar/Navbar"

import { URL_CHATS } from "../../settings/Settings"

export default function ChatManager() {

    const [chatList, setChatList] = useState([])


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

    console.log(chatList)
    return (
        <div>
            <Navbar/>
            {
                chatList.map(({ participants, messages, _id }) => {

                    return (
                        <div>
                        <ChatCard key={_id} _id={_id} participants={participants} messages={messages}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
