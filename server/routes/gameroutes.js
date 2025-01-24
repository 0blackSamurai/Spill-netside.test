const express = require("express");
const router = express.Router();

const gamecontroller = require("../controller/gamecontroller.js");

router.get("/",gamecontroller.getAllGames);
router.post("/", gamecontroller.createGame);
router.get("/:id",gamecontroller.getGame);
router.put("/:id",gamecontroller.editGame);
router.delete("/:id",gamecontroller.deleteGame);

module.exports = router;