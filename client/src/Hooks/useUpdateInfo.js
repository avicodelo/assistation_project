//SEVERAL REQUESTS TO API TO MANAGE USER INFO

//React imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

//Component imports
import { URL_DASHBOARD } from "../settings/Settings"

//Hook imports
import { useCities } from "./useCities"

function useUpdateInfo(initialState, userData) {

    //Const settings
    const { userID } = useParams()
    const [dataUpdated, setDataUpdated] = useState(initialState)
    const [userDataUpdated, setUserDataUpdated] = useState(userData)
    const [activateArea, setActivateArea] = useState(false)
    const accessToken = localStorage.getItem("accesstoken")
    const city = useCities(dataUpdated["address.postalCode"])

    useEffect(() => {
        setDataUpdated(initialState)
        setUserDataUpdated(userData)
    }, [initialState.areaOfResponsibility, userData.address, userData.photo])

    //Manages the inputs that are introduced by user
    const handleInput = (e) => {
        if (e.target.name === "address.postalCode") {
            setDataUpdated({ ...dataUpdated, ...{ [e.target.name]: e.target.value, "address.city": city } });
        } else {
            setDataUpdated({ ...dataUpdated, ...{ [e.target.name]: e.target.value } });
        }
    }

    //Adds a municipality in user data
    const addItem = () => {
        return (e) => {
            e.preventDefault()
            dataUpdated.setAreaOfResponsibility && dataUpdated.areaOfResponsibility.push(dataUpdated.setAreaOfResponsibility)
            setDataUpdated({ ...dataUpdated, ...{ setAreaOfResponsibility: "" } })
        }
    }

    //Deletes a municipality from user data
    const removeItem = () => {
        return (e) => {
            e.preventDefault()
            dataUpdated.areaOfResponsibility.splice(parseInt(e.target.name), 1)
            setDataUpdated({ ...dataUpdated, ...{ areaOfResponsibility: dataUpdated.areaOfResponsibility } });
        }
    }

    //Modify user data in DDBB
    const updateInfo = () => {

        return (e) => {
            e.preventDefault()

            //Deletes empty properties
            for (const property in dataUpdated) {
                if (!dataUpdated[property]) {
                    delete dataUpdated[property];
                }
                setDataUpdated(dataUpdated)
            }

            //PUT data
            const putInfo = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify(dataUpdated)
            }

            //Updates vars with data saved
            fetch(URL_DASHBOARD + userID, putInfo)
                .then(res => res.json())
                .then(({ updatedUser }) => {
                    setUserDataUpdated(updatedUser)
                    setDataUpdated(initialState)
                    window.location.reload()
                    setActivateArea(false)
                })
        }
    }

    return [dataUpdated, handleInput, updateInfo(), addItem(), removeItem(), activateArea, setActivateArea, userDataUpdated]
}

export { useUpdateInfo };