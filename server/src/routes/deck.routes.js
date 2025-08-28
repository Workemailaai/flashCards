const router = require("express").Router();
const DeckController = require("../controllers/Deck.controller");

router
  .get("/", DeckController.getAllDecks)
  .get("/:id", DeckController.getDeckById)
  .post("/", DeckController.createDeck)
  .put("/:id", DeckController.updateDeck)
  .delete("/:id", DeckController.deleteDeck);

module.exports = router;
