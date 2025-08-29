const { User } = require("../db/models");
const bcrypt = require("bcrypt");

class UserService {
  static async getAll() {
    return await User.findAll();
  }

  static async getById(id) {
    return await User.findByPk(id);
  }

  static async create(data) {
    // хэшируем пароль
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await User.create({
      name: data.name || null,
      email: data.email,
      password: hashedPassword,
    });
  }

  static async update(id, data) {
    const user = await this.getById(id);
    if (user) {
      user.name = data.name ?? user.name;
      user.email = data.email ?? user.email;
      if (data.password) {
        user.password = await bcrypt.hash(data.password, 10);
      }
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
