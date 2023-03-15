import { URL_DASHBOARD } from "../settings/Settings"
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom"
import { useCities } from "./useCities"

function useUpdateInfo(initialState, userData) {

    const { userID } = useParams()
    const [dataUpdated, setDataUpdated] = useState(initialState)
    const [userDataUpdated, setUserDataUpdated] = useState(userData)
    const [activateArea, setActivateArea] = useState(false)
    const accessToken = localStorage.getItem("accesstoken")
    const city = useCities(dataUpdated["address.postalCode"])

    useEffect(() => {
        setDataUpdated(initialState)
        setUserDataUpdated(userData)
    }, [initialState.areaOfResponsibility, userData.address])

    const handleInput = (e) => {
        if (e.target.name === "address.postalCode") {
            setDataUpdated({ ...dataUpdated, ...{ [e.target.name]: e.target.value, "address.city": city } });
        } else {
            setDataUpdated({ ...dataUpdated, ...{ [e.target.name]: e.target.value } });
        }
    }

    const addItem = () => {
        return (e) => {
            e.preventDefault()
            dataUpdated.setAreaOfResponsibility && dataUpdated.areaOfResponsibility.push(dataUpdated.setAreaOfResponsibility)
            setDataUpdated({ ...dataUpdated, ...{ setAreaOfResponsibility: "" } })
        }
    }

    const removeItem = () => {
        return (e) => {
            e.preventDefault()
            dataUpdated.areaOfResponsibility.splice(parseInt(e.target.name), 1)
            setDataUpdated({ ...dataUpdated, ...{ areaOfResponsibility: dataUpdated.areaOfResponsibility } });
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
                .then(({ updatedUser }) => {
                    setUserDataUpdated(updatedUser)
                    setDataUpdated(initialState)
                    setActivateArea(false)
                })
        }
    }

    return [dataUpdated, handleInput, updateInfo(), addItem(), removeItem(), activateArea, setActivateArea, userDataUpdated]
}

export { useUpdateInfo };