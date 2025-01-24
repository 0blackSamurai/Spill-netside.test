const express =require("express");
require("dotenv").config();
const mongoose = require("mongoose");


const authroutes = require("./routes/authroutes.js");
const gameroutes = require("./routes/gameroutes.js");
const tagroutes = require("./routes/tagroutes.js");

const app = express();

mongoose.connect(process.env.DB_URL);

app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authroutes);
app.use("/api/games",gameroutes);
app.use("/api/tag",tagroutes);

app.get("/", (req, res) => {
    res.send("Halla");
});

app.listen(process.env.PORT)
