const express = require("express");
const router = express.Router();
const reviewcontroller = require("../controller/reviewcontroller.js");
const verifyjwt = require("../middleware/verifytoken.js");

router.post("/:gameid", verifyjwt, reviewcontroller.createReview);
router.get("/games/:id", reviewcontroller.getReviewsByGame);
router.get("/user/:id", reviewcontroller.getReviewsByUser);
router.get("/:id", reviewcontroller.getReview);
router.delete("/:id", reviewcontroller.deleteReview);

module.exports = router;
