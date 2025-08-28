const DeckService = require("../services/Deck.service");
const isValidId = require("../utils/isValidId");
const formatResponse = require("../utils/formatResponse");

class DeckController {
  static async getAllDecks(req, res) {
    try {
      const deckDecks = await DeckService.getAll();

      if (deckDecks.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "No deckDecks found", []));
      }

      res.status(200).json(formatResponse(200, "success", deckDecks));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getDeckById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid deckDeck ID"));
    }

    try {
      const deckDeck = await DeckService.getById(+id);

      if (!deckDeck) {
        return res
          .status(404)
          .json(formatResponse(404, `Deck with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", deckDeck));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createDeck(req, res) {
    const { title, body } = req.body;

    try {
      const newDeck = await DeckService.create({ title, body });

      if (!newDeck) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new deckDeck`));
      }

      res.status(201).json(formatResponse(201, "success", newDeck));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateDeck(req, res) {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid deckDeck ID"));
    }

    try {
      const updatedDeck = await DeckService.update(+id, { title, body });

      if (!updatedDeck) {
        return res
          .status(404)
          .json(formatResponse(404, `Deck with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", updatedDeck));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteDeck(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid deckDeck ID"));
    }

    try {
      const deletedDeck = await DeckService.delete(+id);

      if (!deletedDeck) {
        return res
          .status(404)
          .json(formatResponse(404, `Deck with id ${id} not found`));
      }

      res.status(200);
      res
        .status(200)
        .json(formatResponse(200, `Deck with id ${id} successfully deleted`));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = DeckController;
