const CardService = require("../services/Card.service");
const isValidId = require("../utils/isValidId");
const formatResponse = require("../utils/formatResponse");

class CardController {
  static async getAllCards(req, res) {
    try {
      const cardCards = await CardService.getAll();

      if (cardCards.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "No cardCards found", []));
      }

      res.status(200).json(formatResponse(200, "success", cardCards));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getCardById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid cardCard ID"));
    }

    try {
      const cardCard = await CardService.getById(+id);

      if (!cardCard) {
        return res
          .status(404)
          .json(formatResponse(404, `Card with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", cardCard));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createCard(req, res) {
    const { title, body } = req.body;

    try {
      const newCard = await CardService.create({ title, body });

      if (!newCard) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new cardCard`));
      }

      res.status(201).json(formatResponse(201, "success", newCard));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateCard(req, res) {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid cardCard ID"));
    }

    try {
      const updatedCard = await CardService.update(+id, { title, body });

      if (!updatedCard) {
        return res
          .status(404)
          .json(formatResponse(404, `Card with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", updatedCard));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteCard(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid cardCard ID"));
    }

    try {
      const deletedCard = await CardService.delete(+id);

      if (!deletedCard) {
        return res
          .status(404)
          .json(formatResponse(404, `Card with id ${id} not found`));
      }

      res.status(200);
      res
        .status(200)
        .json(formatResponse(200, `Card with id ${id} successfully deleted`));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = CardController;
