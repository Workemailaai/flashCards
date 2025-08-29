const UserService = require("../services/User.service");
const isValidId = require("../utils/isValidId");
const formatResponse = require("../utils/formatResponse");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const userUsers = await UserService.getAll();

      if (userUsers.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "No userUsers found", []));
      }

      res.status(200).json(formatResponse(200, "success", userUsers));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid userUser ID"));
    }

    try {
      const userUser = await UserService.getById(+id);

      if (!userUser) {
        return res
          .status(404)
          .json(formatResponse(404, `User with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", userUser));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createUser(req, res) {
    const { title, body } = req.body;

    try {
      const newUser = await UserService.create({ title, body });

      if (!newUser) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new userUser`));
      }

      res.status(201).json(formatResponse(201, "success", newUser));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid userUser ID"));
    }

    try {
      const updatedUser = await UserService.update(+id, { title, body });

      if (!updatedUser) {
        return res
          .status(404)
          .json(formatResponse(404, `User with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", updatedUser));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid userUser ID"));
    }

    try {
      const deletedUser = await UserService.delete(+id);

      if (!deletedUser) {
        return res
          .status(404)
          .json(formatResponse(404, `User with id ${id} not found`));
      }

      res.status(200);
      res
        .status(200)
        .json(formatResponse(200, `User with id ${id} successfully deleted`));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = UserController;
