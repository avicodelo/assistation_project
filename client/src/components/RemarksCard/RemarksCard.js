
//Component imports
import { SERVER_HOST } from "../../settings/Settings";


export default function RemarksCard({ remark }) {


    return (
        <div>
            < img src={SERVER_HOST + remark.writer?.photo} alt="Foto de usuario" width="50"/>
            <p>{remark.writer?.name + " " + remark.writer?.surname}</p>
            <p>{remark.writer?.address.city}</p>
            <p>{remark?.rate}</p>
            <p>{remark?.deployDate}</p>
            <p>{remark?.title}</p>
            <p>{remark?.mainBody}</p>

        </div>

    )
}
