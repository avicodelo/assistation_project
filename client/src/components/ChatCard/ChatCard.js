
import {SERVER_HOST } from "../../settings/Settings"
import ChatWriter from "../ChatWriter/ChatWriter";

export default function ChatCard({_id, participants, messages}) {
    const userIsProvider = typeof participants.provider === "object" ? true : false;
   
    return (
        <div>
            <div>
                <img src={`${SERVER_HOST}${userIsProvider ? participants.provider.photo : participants.customer.photo}`} alt="" width="50" />
                <p>{userIsProvider ? participants.provider.name + " " + participants.provider.surname :
                    participants.customer.name + " " + participants.customer.surname}</p>
                <p>{messages[messages.length - 1].text}</p>
                <p>{messages[messages.length - 1].createdAt}</p>
            </div>

<ChatWriter _id={_id}/>

        </div>
    )
}
