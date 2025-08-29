"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    static associate(models) {
      this.hasMany(models.Card, { foreignKey: "deckId", as: "cards" });
      this.hasMany(models.Round, {
        foreignKey: "deckId",
        as: "rounds",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Deck.init(
    {
      title:{type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true, len: [1, 255] }}
    },
    {
      sequelize,
      modelName: "Deck",
      tableName: "Decks",
    }
  );
  return Deck;
};

