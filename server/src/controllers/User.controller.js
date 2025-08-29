const UserService = require("../services/user.service");
const isValidId = require("../utils/isValidId");
const formatResponse = require("../utils/formatResponse");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(formatResponse(200, "success", users));
    } catch ({ message }) {
      return res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await UserService.getById(req.params.id);
      if (!user) {
        return res.status(404).json(formatResponse(404, "User not found"));
      }
      res.status(200).json(formatResponse(200, "success", user));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json(formatResponse(400, "Email и пароль обязательны"));
      }

      const newUser = await UserService.create({ name, email, password });

      res.status(201).json(formatResponse(201, "success", newUser));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateUser(req, res) {
    try {
      const updatedUser = await UserService.update(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json(formatResponse(404, "User not found"));
      }
      res.status(200).json(formatResponse(200, "success", updatedUser));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteUser(req, res) {
    try {
      const deletedUser = await UserService.delete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json(formatResponse(404, "User not found"));
      }
      res.status(200).json(formatResponse(200, "User deleted"));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = UserController;
