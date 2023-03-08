import { URL_DASHBOARD } from "../settings/Settings"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useCities } from "./useCities"

function useUpdateInfo(initialState) {

    const { userID } = useParams()
    const [dataUpdated, setDataUpdated] = useState(initialState)
    const accessToken = localStorage.getItem("accesstoken")
    const city = useCities(dataUpdated["address.postalCode"])

    const handleInput = (e) => {
        console.log(e.target.name, e.target.value);
        if (e.target.name === "address.postalCode") {
            setDataUpdated({ ...dataUpdated, ...{ [e.target.name]: e.target.value, "address.city": city } });
        } else {
            console.log("entra en update");
            setDataUpdated({ ...dataUpdated, ...{ [e.target.name]: e.target.value } });
        }
    }

    const updateInfo = () => {

        return (e) => {
            e.preventDefault()
            for (const property in dataUpdated) {
                if (!dataUpdated[property]) {
                    delete dataUpdated[property];
                }
                setDataUpdated(dataUpdated)
            }

            //PUT
            const putInfo = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify(dataUpdated)
            }

            fetch(URL_DASHBOARD + userID, putInfo)
                .then(res => res.json())
                .then(() => {
                    window.location.reload()
                })
        }
    }

    return [dataUpdated, handleInput, updateInfo()]
}

export { useUpdateInfo };