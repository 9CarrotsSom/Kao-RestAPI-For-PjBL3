require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
const urlEncoded = bodyparser.urlencoded({
    limit: "50mb",
    extended: true,
});
const jsonEncoded = express.json({
    limit: "50mb",
});

const config = require("./config/config");
const route = require("./routes/route");



app.use(cors());
app.use(morgan("dev"));
app.use(urlEncoded);
app.use(jsonEncoded);

app.use("/api", route);

app.listen(config.port, () =>{
    console.log("> Started server on port : " + config.port);
});