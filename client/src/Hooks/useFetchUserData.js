import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { URL_DASHBOARD } from "../settings/Settings";

function useFetchUserData() {
    const { userID } = useParams()
    const accessToken = localStorage.getItem("accesstoken")
    const [userData, setUserData] = useState({})
    const [tokenValid, setTokenValid] = useState(true)


    const setGetHeader = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
    }


    //Fetch info
    useEffect(() => {
        fetch(URL_DASHBOARD + userID, setGetHeader)
            .then(res => res.json())
            .then(({ ok, result, message }) => {
                if (!ok && message === "Token inválido") {
                    setTokenValid(false)
                    localStorage.removeItem("accesstoken")
                    localStorage.removeItem("userID")

                } else {
                    setUserData(result);
                }
            })

    }, [userID])

    return [userData, userID, tokenValid]
}

export { useFetchUserData }

