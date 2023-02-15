import { useContext } from "react"
import { dashboardContext } from "../../pages/Dashboard/Dashboard"


export default function UserAddress() {
    const userData = useContext(dashboardContext);
    const { address } = userData;

    return (
        <div>
            <h2>{address.street}</h2>
            <h2>{address.number}</h2>
            <h2>{address.flat}</h2>
            <h2>{address.city}</h2>
            <h2>{address.locality}</h2>
            <h2>{address.postalCode}</h2>
            <h2>{address.country}</h2>

        </div>
    )
}
