const express = require("express");
const router = express.Router();
const authController = require("../controller/authController.js");
const verifytoken = require("../middleware/verifytoken.js");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/user", verifytoken, authController.user);

module.exports = router;