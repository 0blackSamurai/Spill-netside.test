const jwt = require("jsonwebtoken");
require("dotenv").config();


async function  createjwt (email, role) {
    
    const jwttoken = jwt.sign({ role, email }, process.env.SecretJWT);
    console.log(jwttoken,  "JWT TOKEN")

    return jwttoken;

}

module.exports = createjwt; 