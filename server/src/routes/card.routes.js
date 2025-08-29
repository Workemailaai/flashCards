const router = require("express").Router();
const CardController = require("../controllers/Card.controller");

router
  .get("/", CardController.getAllCards)
  .get("/:id", CardController.getCardById)
  .post("/", CardController.createCard)
  .put("/:id", CardController.updateCard)
  .delete("/:id", CardController.deleteCard);

module.exports = router;
