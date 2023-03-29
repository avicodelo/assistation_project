const multer = require ("multer")
const path = require ("path")

const MIMETYPES = ["image/jpeg", "image/png"]

const multerUserAvatar = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, "../assets/images"),
        filename: (req, file, cb) => {
            const id = req.params.userID
            cb(null, `${id}${path.extname(file.originalname)}`)
        }
    }),
    fileFilter: (req, file, cb) => {
        if (MIMETYPES.includes(file.mimetype)) cb(null, true);
        else cb(new Error("Only images"))
    },
    limits: {
        fileSize: 10000000
    }
}).single("avatar")

module.exports = multerUserAvatar