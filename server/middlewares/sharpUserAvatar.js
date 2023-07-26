//MANAGES THE AVATAR IMAGE

//Modules imports
const sharp = require("sharp")
const path = require("path")
const MIMETYPES = ["image/jpeg", "image/png"]

const sharpUserAvatar = async (req, res, next) => {

    //Const settings
    const id = req.params.userID;
    const avatarImage = req.files.avatarImage
    const imageName = `${id}.png`

    //Detects the file format
    if (!MIMETYPES.includes(avatarImage.mimetype)) {
        res.status(400).json({ ok: false, error: "Es necesario enviar una imagen" })
    }

    //Modify the image
    await sharp(avatarImage.data)
        .resize(200, 200)
        .png()
        .toFile(path.join(__dirname, `../assets/images/${imageName}`), (err, info) => {
            if (err) {
                res.status(400).json({ ok: false, error: "Ha habido un problema al cargar la imagen" })
            } else {
                req.imageName = imageName
                next()
            }

        })
}

module.exports = sharpUserAvatar