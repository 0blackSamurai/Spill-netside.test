const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userschema.js");

async function verifytoken(req, res, next) {
  try {
    const jsonwebtoken = req.cookies.jwt;
    
    // Check if the token exists
    if (!jsonwebtoken) {
      return res.status(401).send({ msg: "No token provided, please login" });
    }

    // Verify the token
    jwt.verify(jsonwebtoken, process.env.SECRETJWT, async (err, decoded) => {
      if (err) {
        console.log("JWT verification error:", err);
        return res.status(401).send({ msg: "Unauthorized: Invalid token" });
      }
      
      if (!decoded) {
        return res.status(401).send({ msg: "Unauthorized: Token could not be decoded" });
      }
      
      req.user = decoded;
      
      try {
        // Only proceed if email exists in decoded token
        if (decoded.email) {
          const user = await User.findOne({ email: decoded.email });
          if (user) {
            req.user.id = user._id;
            next();
          } else {
            return res.status(404).send({ msg: "User not found" });
          }
        } else {
          return res.status(401).send({ msg: "Invalid token structure" });
        }
      } catch (error) {
        console.log("Database error:", error);
        return res.status(500).send({ msg: "Internal server error" });
      }
    });
  } catch (error) {
    console.log("General error in verify token middleware:", error);
    return res.status(500).send({ msg: "Internal server error in authentication" });
  }
}

module.exports = verifytoken;