"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rounds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: true,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      deckId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Decks",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      total: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // await queryInterface.addIndex("Rounds", ["userId"]);
    // await queryInterface.addIndex("Rounds", ["deckId"]);
    await queryInterface.addIndex("Rounds", ["userId", "deckId"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rounds");
  },
};
