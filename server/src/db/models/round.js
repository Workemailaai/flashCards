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
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Deck, { foreignKey: "deckId" });
    }
  }
  Round.init(
    {
      userId: DataTypes.INTEGER,
      deckId: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Round",
    }
  );
  return Round;
};
