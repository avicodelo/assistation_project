const config = require("../config/config");

//Modules imports
const jwt = require("jsonwebtoken");

//Authenticates the user
const verifyToken = (req, res, next) => {

    !req.get("authorization") && res.status(401).json({ ok: false, error: "no estas autorizado" })

    let token = req.get("authorization");


    token = token && token.split(" ")[1]; 

    jwt.verify(token, config.SEED, (error, payload) => {
        if (error) {
            res.status(401).json({ ok: false, error: "Token inválido" })
        } else {
            req.payload = payload;
            next()
        }
    })
}

module.exports = verifyToken;

