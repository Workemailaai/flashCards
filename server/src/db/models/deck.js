"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
 
    static associate(models) {
      this.hasMany(models.Card, { foreignKey: "deckId", as: 'cards' });
      this.hasMany(models.Round, { foreignKey: "deckId" });
    }
  }
  Deck.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Deck",
    }
  );
  return Deck;
};
