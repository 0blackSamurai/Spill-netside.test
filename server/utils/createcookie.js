require("dotenv").config();

async function createCookie(res, jwttoken){
    res.cookie("jwt", jwttoken, {
        httpOnly: true,
        maxAge: 1000*60*60*24*5, 
        sameSite:"lax",
        secure: process.env.NODE_ENV === "production",
      });
}

module.exports = createCookie;