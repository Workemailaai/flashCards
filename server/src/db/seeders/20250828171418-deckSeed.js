"use strict";

const data = [
  {
    title: "Италия",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Моника Беллуччи",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Адриано Челентано",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Decks", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Decks", null, {});
  },
};
