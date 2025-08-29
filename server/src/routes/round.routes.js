const router = require("express").Router();
const RoundController = require("../controllers/Round.controller");

router
  .get("/", RoundController.getAllRounds)
  .get("/:id", RoundController.getRoundById)
  .post("/", RoundController.createRound)
  .put("/:id", RoundController.updateRound)
  .delete("/:id", RoundController.deleteRound);

module.exports = router;
