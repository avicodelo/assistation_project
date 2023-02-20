
const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {

    !req.get("authorization") && res.status(401).json({ ok: false, message: "no estas autorizado" })

    let token = req.get("authorization");


    token = token && token.split(" ")[1]; 

    jwt.verify(token, process.env.SEED, (error, payload) => {
        if (error) {
            res.status(401).json({ ok: false, message: error })
        } else {
            req.payload = payload;
            next()
        }
    })
}

module.exports = verifyToken;

