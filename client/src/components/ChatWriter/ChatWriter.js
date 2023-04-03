import React, { useEffect } from 'react'

import { URL_CHATS } from '../../settings/Settings'

export default function ChatWriter({_id}) {
    useEffect(()=>{
        const accessToken = localStorage.getItem("accesstoken")
        const setGetHeader = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
        }
        fetch(`${URL_CHATS}chatroom?chatroom=${_id}`, setGetHeader)
            .then(res => res.json())
            .then(chat => console.log(chat))
    },[])
  return (
    <div>ChatWriter</div>
  )
}
