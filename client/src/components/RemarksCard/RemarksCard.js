//React imports


export default function RemarksCard({ remark }) {


    return (
        <div>
            < img src={remark.writer?.userImage} alt="Foto de usuario" />
            <p>{remark.writer?.userName}</p>
            <p>{remark?.rate}</p>
            <p>{remark?.deployDate}</p>
            <p>{remark?.title}</p>
            <p>{remark?.mainBody}</p>

        </div>

    )
}
