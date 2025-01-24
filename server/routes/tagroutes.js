const express = require("express");
const router = express.Router();

const tagcontroller = require("../controller/tagcontroller.js");

router.get("/",tagcontroller.getAllTags)
router.post("/",tagcontroller.createTag)
router.get("/",tagcontroller.getTag)
router.put("/",tagcontroller.updateTag)
router.delete("/",tagcontroller.deleteTag)

module.exports = router