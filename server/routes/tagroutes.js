const express = require("express");
const router = express.Router();

const tagcontroller = require("../controller/tagcontroller.js");

router.get("/",tagcontroller.getAllTags)
router.post("/",tagcontroller.createTag)
router.get("/:id",tagcontroller.getTag)
router.put("/:id",tagcontroller.updateTag)
router.delete("/:id",tagcontroller.deleteTag)

module.exports = router