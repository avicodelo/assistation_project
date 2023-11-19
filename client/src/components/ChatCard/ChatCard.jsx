//SETS THE STRUCTURE OF CHATCARD

//CSS import
import style from "./ChatCard.module.css"

//Component imports
import { SERVER_HOST } from "../../settings/Settings"

export default function ChatCard({ participants, messages }) {
    //const settings
    const userIsProvider = typeof participants.provider === "object" ? true : false;
    const lastMessageText = messages[messages.length - 1]?.text
    const lastMessageDate = messages[messages.length - 1]?.createdAt.split("T")

    return (

        //Format of user chatcard
        <div className={style.chatUserWrapper}>

            <img className={style.image}
                src={`${SERVER_HOST}${userIsProvider ? participants.provider.photo : participants.customer.photo}`}
                alt="" width="50" />
            <h4 className={style.name}>
                {userIsProvider ?
                    participants.provider.name + " " + participants.provider.surname
                    :
                    participants.customer.name + " " + participants.customer.surname}
            </h4>
            <p className={style.lastMessage}>{lastMessageText}</p>
            <h6 className={style.date}>{lastMessageDate?.join(" ")}</h6>

        </div>
    )
}
