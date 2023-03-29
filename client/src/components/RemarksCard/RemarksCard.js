
//Component imports
import { SERVER_HOST } from "../../settings/Settings";


export default function RemarksCard({ remark }) {


    return (
        <div>
            < img src={SERVER_HOST + remark.writer?.userImage} alt="Foto de usuario" />
            <p>{remark.writer?.userName}</p>
            <p>{remark?.rate}</p>
            <p>{remark?.deployDate}</p>
            <p>{remark?.title}</p>
            <p>{remark?.mainBody}</p>

        </div>

    )
}
