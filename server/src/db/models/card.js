"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Deck, { foreignKey: "deckId", as: 'deck' });
    }
  }
  Card.init(
    {
      question: DataTypes.STRING,
      answer: DataTypes.STRING,
      deckId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Card",
    }
  );
  return Card;
};
