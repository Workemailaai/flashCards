const { Card } = require("../db/models");

class CardService {
  static async getAll() {
    return await Card.findAll();
  }

  static async getById(id) {
    return await Card.findByPk(id);
  }

  static async create(data) {
    return await Card.create(data);
  }

  static async update(id, data) {
    const card = await this.getById(id);
    if (card) {
      card.title = data.title;
      await card.save();
    }
    return card;
  }

  static async delete(id) {
    const card = await this.getById(id);
    if (card) {
      await card.destroy();
    }
    return card;
  }
}

module.exports = CardService;
