const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authroutes = require("./routes/authroutes.js");
const gameroutes = require("./routes/gameroutes.js");
const tagroutes = require("./routes/tagroutes.js");
const reviewroutes = require("./routes/reviewroutes.js");

const app = express();

let corsOption = {
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
    credentials:true,
}
app.use(cors(corsOption));
app.use(cookieParser());

mongoose.connect(process.env.DB_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authroutes);
app.use("/api/games", gameroutes);
app.use("/api/tags", tagroutes);
app.use("/api/reviews", reviewroutes);

app.get("/", (req, res) => {
  res.send("Halla");
});

app.listen(process.env.PORT);
