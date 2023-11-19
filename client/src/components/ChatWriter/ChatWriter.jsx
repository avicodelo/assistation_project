//MANAGES THE CHAT BETWEEN USERS

//CSS import
import style from "./ChatWriter.module.css"

//React imports
import { useEffect, useState } from 'react'

//Component imports
import { URL_CHATS } from '../../settings/Settings'

export default function ChatWriter({ chatID }) {

  //Const settings
  const userID = localStorage.getItem("userID")
  const accessToken = localStorage.getItem("accesstoken")
  const initialState = {
    text: ""
  }
  const [textToSend, setTextToSend] = useState(initialState)
  const [participants, setParticipants] = useState({})
  const [allowedToWrite, setAllowedToWrite] = useState(true)
  const [messages, setMessages] = useState([])

  //Contact with API REST to get info about user chats
  useEffect(() => {
    if (chatID) {
      //GET data
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

        //Modifies messages var and allows users to write
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

  //Saves inputs in an object variable
  const handleInput = (e) => {
    setTextToSend({ ...textToSend, ...{ [e.target.name]: e.target.value } })
  } 

//Sends message to chat stablished
const sendMessage = () => {
    const IdToSend = (Object.values(participants).find(users => Object.values(users?._id) !== userID))?._id 
    return () => {
      //POST data
      const postInfo = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        },
        body: JSON.stringify({ ...textToSend, ...{ chatID: chatID } })
      }

      //Sends the message
      fetch(`${URL_CHATS}?sendTo=${IdToSend}`, postInfo)
        .then(res => res.json)
        .then(
          setTextToSend(initialState)
        )
    }
  }


  //Chat page format that detects if there is any problem with authorization
  if (chatID && allowedToWrite) {
    //Const set
    const provider = participants?.provider
    const customer = participants?.customer
    const receiver = provider?._id !== userID ?
      `${provider?.name} ${provider?.surname}` :
      `${customer?.name} ${customer?.surname}`;

    return (
      <div className={style.mainWrapper}>
        <h4>{receiver}</h4>
        <div className={style.messagesContainer}>
          {
            messages.map(({ createdAt, text, sender, _id }) => {
              return (
                //Shows mesagges between users
                <div key={_id} className={sender === userID ? style.senderMsgContainer : style.receiverMsgContainer}>
                  <p >{text}</p>
                  <h6>{createdAt.split("T").join(" ")}</h6>
                </div>
              )

            })
          }
        </div>

        <div className={style.writerContainer}>
          <button onClick={sendMessage()}>Enviar</button>
          <input type="text" name="text" onChange={handleInput} value={textToSend.text} placeholder='Enviar mensaje' />
        </div>
      </div>
    )
  } else if (!allowedToWrite) {
    return (
      <div>
        <h3>Algo salió mal, vuelve a intentarlo</h3>
      </div>
    )
  }

}
