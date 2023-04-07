import React, { useEffect, useState } from 'react'

import { URL_CHATS } from '../../settings/Settings'

export default function ChatWriter({ chatID }) {
  const [messages, setMessages] = useState([])
  const userID = localStorage.getItem("userID")
  const accessToken = localStorage.getItem("accesstoken")

  const initialState = {
    text: ""
  }
  const [textToSend, setTextToSend] = useState(initialState)
  const [participants, setParticipants] = useState({})

  useEffect(() => {
    const setGetHeader = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
    }
    if (chatID) {
      fetch(`${URL_CHATS}/chatroom?chatroom=${chatID}`, setGetHeader)
        .then(res => res.json())
        .then(({ chatroom }) => {
          setMessages(chatroom.messages);
          setParticipants(chatroom.participants)
        })
    }
  }, [chatID, textToSend.text])

  const handleInput = (e) => {
    setTextToSend({ ...textToSend, ...{ [e.target.name]: e.target.value } })
  }
  const sendMessage = () => {
    return () => {
      const IdToSend = Object.values(participants).find(users => users !== userID)

      const postInfo = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        },
        body: JSON.stringify({ ...textToSend, ...{ chatID: chatID } })
      }

      fetch(`${URL_CHATS}?sendTo=${IdToSend}`, postInfo)
        .then(res => res.json)
        .then(
          setTextToSend(initialState)
        )
    }
  }

  if (chatID) {
    return (
      <div>
        <div>
          {
            messages.map(({ createdAt, text, sender, _id }) => {
              
                return (
                  <div key={_id} style={{ backgroundColor: Object.values(sender).includes(userID) ? "lightblue" : "white" }}>
                    <p >{text}</p>
                    <h6>{createdAt}</h6>
                  </div>
                )
              
            })
          }

        </div>
        <div>
          <input type="text" name="text" onChange={handleInput} value={textToSend.text} placeholder='Enviar mensaje' />
          <button onClick={sendMessage()}>Enviar</button>
        </div>
      </div>
    )
  }

}
