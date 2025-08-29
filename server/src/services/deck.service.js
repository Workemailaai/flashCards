const { Deck } = require("../db/models");
const { Card } = require("../db/models");

class DeckService {
  static async getAll() {
    return await Deck.findAll();
  }

  static async getById(id) {
    return await Deck.findByPk(id);
  }

  static async create(data) {
    return await Deck.create(data);
  }

  static async update(id, data) {
    const deck = await this.getById(id);
    if (deck) {
      deck.title = data.title;
      await deck.save();
    }
    return deck;
  }

  static async delete(id) {
    const deck = await this.getById(id);
    if (deck) {
      await deck.destroy();
    }
    return deck;
  }
  static async getQuestionsByDeckId(deckId) {
    const deck = await Deck.findByPk(deckId);
    if (!deck) return { deck: null, cards: [] };

    const cards = await Card.findAll({
      where: { deckId },
      order: [["id", "ASC"]],
      attributes: [
        "id",
        "question",
        "answer",
        "deckId",
        "createdAt",
        "updatedAt",
      ],
    });

    return { deck, cards };
  }
}

module.exports = DeckService;
