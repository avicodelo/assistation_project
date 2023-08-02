//Config variables

require("dotenv").config({path:"./config/.env"});

module.exports = {
    PORT: process.env.PORT || 3002,
    URL_DB: process.env.URL_DB || "mongodb://localhost:27017/assistationDB",
    URL_SETPASS: process.env.URL_SETPASS || "http://localhost:3000/login/passwordForgotten/setpass",
    SEED: process.env.SEED || "SUPER SECRET SEED",
    MAIL: process.env.MAIL || "" /*set your email*/,
    MAILPASS: process.env.MAILPASS || "" /*set your password */
}