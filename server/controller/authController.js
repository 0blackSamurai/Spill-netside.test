const User = require("../models/userschema.js");
const bcrypt = require("bcrypt");
const saltrounds = parseInt(process.env.SALTROUNDS);
const jwt = require("jsonwebtoken");
const createjwt = require("../utils/createjwt.js")
const createCookie = require("../utils/createcookie.js")
const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email);

      
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }

      const isPassword = await bcrypt.compare(password, user.password);
      console.log(isPassword);

      if (isPassword) {
        let role = "user";
       const jwttoken = createjwt(email, role);
       await createCookie(res, jwttoken);
        res.status(202).send({ msg: "Successful login", user: user });
      } else {
        res.status(401).send({ msg: "Invalid email or password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "An error occurred during login" });
    }
  },

  register: async (req, res) => {
    try {
      const { email, password, repeatPassword } = req.body;
      const role = "user";

      if (password !== repeatPassword) {
        return res.status(400).send({ msg: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, saltrounds);
      const user = new User({
        email: email,
        password: hashedPassword,
      });
     const jwttoken = createjwt(email, role);
     await createCookie(res, jwttoken);

      console.log(user);
      await user.save();
      

    //   const role = "user";
      

      res.status(201).send({ msg: "Successful signup", user: user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "An error occurred during signup" });
    }
  },
};

module.exports = authController;
