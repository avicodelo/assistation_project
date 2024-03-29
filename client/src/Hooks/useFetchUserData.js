//GET USER DATA FROM DDBB

//React imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function useFetchUserData(URL) {

    //Const settings
    const { userID } = useParams()
    const accessToken = localStorage.getItem("accesstoken")
    const [userData, setUserData] = useState({})
    const [tokenValid, setTokenValid] = useState(true)

    //GET data
    const setGetHeader = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
    }

    //Modify output with user data
    useEffect(() => {
        fetch(URL + userID, setGetHeader)
            .then(res => res.json())
            .then(({ ok, result, error}) => {
                if (!ok ) {
                    console.log(error);
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

