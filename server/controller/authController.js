const User = require("../models/userschema.js");
const bcrypt = require("bcrypt");
const saltrounds = parseInt(process.env.SALTROUNDS);
const jwt = require("jsonwebtoken");
const createjwt = require("../utils/createjwt.js");
const createCookie = require("../utils/createcookie.js");

const authController = {
  user: async (req, res) => {
    console.log(req.user, "USER");
    try {
      const user = await User.findOne({email: req.user.email})
        .select('email name role age adr');
      
      if(user){
        res.status(200).send({msg: "User found", user: user.toObject()});
      } else {
        res.status(404).send({msg: "User not found"});
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({msg: "Something went wrong"});
    }
  },
  
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
        const jwttoken = await createjwt(email, role);
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
  logout : (req, res) => {
    res.clearCookie('user');
    res.redirect("/login");
},

register: async (req, res) => {
    try {
      const { email, password, repeatPassword } = req.body;
      const role = "user";
      
      // Check if user already exists
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).send({ msg: "Email already in use" });
      }
      
      if (password !== repeatPassword) {
        return res.status(400).send({ msg: "Passwords do not match" });
      }
      
      const hashedPassword = await bcrypt.hash(password, saltrounds);
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      
      const jwttoken = await createjwt(email, role);
      await createCookie(res, jwttoken);

      await user.save();
      
      res.status(201).send({ msg: "Successful signup", user: {
        email: user.email,
        _id: user._id
      }});
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "An error occurred during signup" });
    }
  },
};

module.exports = authController;