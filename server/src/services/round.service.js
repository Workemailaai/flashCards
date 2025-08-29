const { Round } = require("../db/models");

class RoundService {
  static async getAll() {
    return await Round.findAll();
  }

  static async getById(id) {
    return await Round.findByPk(id);
  }

  static async create(data) {
    return await Round.create(data);
  }

  static async update(id, data) {
    const round = await this.getById(id);
    if (round) {
      round.title = data.title;
      await round.save();
    }
    return round;
  }

  static async delete(id) {
    const round = await this.getById(id);
    if (round) {
      await round.destroy();
    }
    return round;
  }

  static async createRound({ userId, deckId, score, total }) {
    const round = await Round.create({ userId, deckId, score, total });
    return round;
  }

  static async getRoundsByUser(userId) {
    return await Round.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  }
}

module.exports = RoundService;
