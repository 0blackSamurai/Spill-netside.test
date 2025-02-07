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
    origin: function (origin, callback) {
        // Manually specify the allowed origins
        const allowedOrigins = [
            "http://10.12.44.82",
            "http://localhost:3000",
            "http://gameify.hyena.ikt-fag.no"
        ];

        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // Allow the origin if it's in the allowedOrigins array
            callback(null, true);
        } else {
            // Reject the request if origin is not allowed
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
};

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
