"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Round extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      this.belongsTo(models.Deck, { foreignKey: "deckId", as: "deck" });
    }
  }
  Round.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true, 
      },
      deckId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
      {
      sequelize,
      modelName: "Round",
      tableName: "Rounds",
      indexes: [
        { fields: ["userId"] },
        { fields: ["deckId"] },
        { fields: ["userId", "deckId"] },
      ],
    }
  );
  return Round;
};
