const RoundService = require("../services/round.service");
const isValidId = require("../utils/isValidId");
const formatResponse = require("../utils/formatResponse");

class RoundController {
  static async getAllRounds(req, res) {
    try {
      const Rounds = await RoundService.getAll();

      if (Rounds.length === 0) {
        return res.status(200).json(formatResponse(200, "No Rounds found", []));
      }

      res.status(200).json(formatResponse(200, "success", Rounds));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getRoundById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid Round ID"));
    }

    try {
      const Round = await RoundService.getById(+id);

      if (!Round) {
        return res
          .status(404)
          .json(formatResponse(404, `Round with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", Round));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  // static async createRound(req, res) { //повторяется
  //   const { title, body } = req.body;

  //   try {
  //     const newRound = await RoundService.create({ title, body });

  //     if (!newRound) {
  //       return res
  //         .status(400)
  //         .json(formatResponse(400, `Failed to create new Round`));
  //     }

  //     res.status(201).json(formatResponse(201, "success", newRound));
  //   } catch ({ message }) {
  //     console.error(message);
  //     res
  //       .status(500)
  //       .json(formatResponse(500, "Internal server error", null, message));
  //   }
  // }

  static async updateRound(req, res) {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid Round ID"));
    }

    try {
      const updatedRound = await RoundService.update(+id, { title, body });

      if (!updatedRound) {
        return res
          .status(404)
          .json(formatResponse(404, `Round with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", updatedRound));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteRound(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid Round ID"));
    }

    try {
      const deletedRound = await RoundService.delete(+id);

      if (!deletedRound) {
        return res
          .status(404)
          .json(formatResponse(404, `Round with id ${id} not found`));
      }

      res.status(200);
      res
        .status(200)
        .json(formatResponse(200, `Round with id ${id} successfully deleted`));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async create(req, res) {
    try {
      const { userId = null, deckId, score, total } = req.body;

      if (!isValidId(deckId)) {
        return res
          .status(400)
          .json(formatResponse(400, "deckId обязателен", null, "BAD_REQUEST"));
      }
      if (typeof score !== "number" || typeof total !== "number") {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "score и total обязательны",
              null,
              "BAD_REQUEST"
            )
          );
      }

      const round = await RoundService.createRound({
        userId,
        deckId: Number(deckId),
        score,
        total,
      });

      return res.status(201).json(formatResponse(201, "created", round, null));
    } catch (e) {
      console.error("Round.create error", e);
      return res
        .status(500)
        .json(formatResponse(500, "internal_error", null, e.message));
    }
  }

  static async getByUser(req, res) {
    try {
      const { userId } = req.params;
      if (!isValidId(userId)) {
        return res
          .status(400)
          .json(formatResponse(400, "userId обязателен", null, "BAD_REQUEST"));
      }
      const rounds = await RoundService.getRoundsByUser(Number(userId));
      return res.json(formatResponse(200, "success", rounds, null));
    } catch (e) {
      console.error("Round.getByUser error", e);
      return res
        .status(500)
        .json(formatResponse(500, "internal_error", null, e.message));
    }
  }
}

module.exports = RoundController;
