import React, { useEffect, useState } from 'react'

import { URL_CHATS } from '../../settings/Settings'

export default function ChatWriter({ chatID }) {
  const [allowedToWrite, setAllowedToWrite] = useState(true)
  const [messages, setMessages] = useState([])
  const userID = localStorage.getItem("userID")
  const accessToken = localStorage.getItem("accesstoken")

  const initialState = {
    text: ""
  }
  const [textToSend, setTextToSend] = useState(initialState)
  const [participants, setParticipants] = useState({})


  useEffect(() => {
    if (chatID) {
      const setGetHeader = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        }
      }

      fetch(`${URL_CHATS}/chatroom?chatroom=${chatID}`, setGetHeader)
        .then(res => {
          if (res.ok) { 
            return res.json()
          } else {
            throw Error(res.statusText)
          }
        })
        .then(({ chatroom }) => {
          setMessages(chatroom.messages);
          setParticipants(chatroom.participants)
          setAllowedToWrite(true)
        })
        .catch(error => {
          setAllowedToWrite(false)
          console.log(error + ": No perteneces a este chat")
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

  if (chatID && allowedToWrite) {
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
  } else if (!allowedToWrite) {
    return (
      <div>
        <h3>No hagas un mal uso de la página, sabes que no perteneces a este chat</h3>
      </div>
    )
  }

}
