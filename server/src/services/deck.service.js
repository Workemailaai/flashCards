const { Deck } = require("../db/models");

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
}

module.exports = DeckService;
