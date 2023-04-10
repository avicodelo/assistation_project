//Initiators
require("./config/config");

const express = require("express");
const app = express();
const cors = require("cors");
const path=require("path")
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload")

//mongoose config
mongoose.set("strictQuery", false);
mongoose.connect(process.env.URL_DB);
const db = mongoose.connection;

//Status of conection
db.on("error", (err) => console.log("Conection to DB has failed", err));
db.once("open", () => console.log("Successful DB connection"));

//Middles
app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials:true}))
app.use(fileUpload())

//Endpoints config

const ContactAlone = require("./routes/contactsAloneRoute");
app.use("/contactAlone", ContactAlone);

const Customer = require("./routes/customerRoute");
app.use("/customers", Customer);

const Provider = require("./routes/providerRoute");
app.use("/providers", Provider);

const Login = require("./routes/login");
app.use("/login", Login);

const PassForgotten = require("./routes/passForgotten");
app.use("/passForgotten", PassForgotten);

const Dashboard = require("./routes/dashboard");
app.use("/dashboard", Dashboard);

const Remarks = require("./routes/remarksRoute");
app.use("/remarks", Remarks)

const Chats = require("./routes/chatsRoute");
app.use("/chats", Chats)

app.use(express.static(path.join(__dirname, "assets/images")))

//Activamos la escucha
app.listen(process.env.PORT, () => console.log("Listening port " + process.env.PORT)); 