const RoundService = require("../services/Round.service");
const isValidId = require("../utils/isValidId");
const formatResponse = require("../utils/formatResponse");

class RoundController {
  static async getAllRounds(req, res) {
    try {
      const Rounds = await RoundService.getAll();

      if (Rounds.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "No Rounds found", []));
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

  static async createRound(req, res) {
    const { title, body } = req.body;

    try {
      const newRound = await RoundService.create({ title, body });

      if (!newRound) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new Round`));
      }

      res.status(201).json(formatResponse(201, "success", newRound));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

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
}

module.exports = RoundController;
