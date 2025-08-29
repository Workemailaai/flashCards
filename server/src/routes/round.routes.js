const router = require("express").Router();
const RoundController = require("../controllers/Round.controller");

router
  .get("/", RoundController.getAllRounds)
  .get("/:id", RoundController.getRoundById)
  .put("/:id", RoundController.updateRound)
  .delete("/:id", RoundController.deleteRound)
  .post('/', RoundController.create)
  .get('/user/:userId', RoundController.getByUser);

module.exports = router;
