const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userschema.js");

async function verifytoken(req, res, next) {
    const jsonwebtoken = req.cookies.jwt;

    await jwt.verify(jsonwebtoken, process.env.SECRETJWT,(async(err, decoded) => {
        if(err){
            
            console.log(err)
            res.status(401).send({msg: "Unauthorized"})
        }
        req.user = decoded;
        let email = decoded.email;
        
        try {
            const user = await User.findOne({ email });
            req.user.id = user._id;
            console.log(user,"USER ");
            
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "Internal server error"})
            return;
            
        }
        console.log("RUNNING AFTER TRYCATCH")
    })).then(() => {
        console.log("RUNNING THEN")
        next();
        console.log(next);
    
    })

};

module.exports = verifytoken;