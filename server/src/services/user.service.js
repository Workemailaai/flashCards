const { User } = require("../db/models");

class UserService {
  static async getAll() {
    return await User.findAll();
  }

  static async getById(id) {
    return await User.findByPk(id);
  }

  static async create(data) {
    return await User.create(data);
  }

  static async update(id, data) {
    const user = await this.getById(id);
    if (user) {
      user.title = data.title;
      await user.save();
    }
    return user;
  }

  static async delete(id) {
    const user = await this.getById(id);
    if (user) {
      await user.destroy();
    }
    return user;
  }
}

module.exports = UserService;
