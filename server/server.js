//Initiators
require("./config/config");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//mongoose config
mongoose.set("strictQuery", false);
mongoose.connect(process.env.URL_DB);
const db = mongoose.connection;

//Status of conection
db.on("error", (err) => console.log("Conection to DB has failed", err));
db.once("open", () => console.log("Successful DB connection"));

//Middlewares
app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}))

//Endpoints config
const contactAlone = require("./routes/contactsAloneRoute");
app.use("/contactAlone", contactAlone);

const customer = require("./routes/customerRoute");
app.use("/customers", customer);

const provider = require("./routes/providerRoute");
app.use("/providers", provider);

//Activamos la escucha
app.listen(process.env.PORT, () => console.log("Listening port " + process.env.PORT)); 