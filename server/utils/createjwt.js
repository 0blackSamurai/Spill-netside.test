const jwt = require("jsonwebtoken");
require("dotenv").config();


function createjwt (email, role) {
    
    const jwttoken = jwt.sign({ role }, process.env.SecretJWT);
    console.log(jwttoken,  "JWT TOKEN")

    return jwttoken;

}

module.exports = createjwt; 