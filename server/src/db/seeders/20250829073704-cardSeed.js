"use strict";

const data = [
  {
    question: "Какой знаменитый итальянский город построен на воде?",
    answer: "Венеция",
    deckId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Какая популярная еда считается символом Италии?",
    answer: "Пицца",
    deckId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Как называется самая знаменитая башня в Италии?",
    answer: "Пизанская башня",
    deckId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Какая валюта используется в Италии?",
    answer: "Евро",
    deckId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Какое море омывает Италию с запада?",
    answer: "Тирренское",
    deckId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question:
      "Какой вулкан находится рядом с Неаполем и однажды разрушил Помпеи?",
    answer: "Везувий",
    deckId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question:
      "Как называется регион в Италии, где производят много вина и оливкового масла?",
    answer: "Тоскана",
    deckId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Какой вид пасты в Италии подают с соусом болоньезе?",
    answer: "Спагетти",
    deckId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Какую профессию Моника начала осваивать до актёрской карьеры?",
    answer: "Модель",
    deckId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Кто был первым мужем Моники Беллуччи?",
    answer: "Венсан Кассель",
    deckId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Сколько у Моники Беллуччи детей?",
    answer: "Два",
    deckId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "В каком возрасте Моника начала модельную карьеру?",
    answer: "13",
    deckId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Сколько языков знает Моника",
    answer: "4",
    deckId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Роль, сделавшая Монику мировым открытием?",
    answer: "Маленa",
    deckId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Какой феномен существует вокруг её появлений?",
    answer: "Эффект Моника",
    deckId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Кого сыграла Моника в Матрице» (2003)?",
    answer: "Персефону",
    deckId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "В каком городе родился Адриано Челентано",
    answer: "Милан",
    deckId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Кем работал до карьеры музыканта?",
    answer: "Часовщиком",
    deckId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "В скольких фильмах снясля Челентано?",
    answer: "39",
    deckId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Сколько детей у Челентано?",
    answer: "3",
    deckId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Какой тип пасты назван в честь него",
    answer: "Челентани",
    deckId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Первый фильм, в котором снялся Адриано Челентано?",
    answer: "Сладкая жизнь",
    deckId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "В каком году был последний концерт Челентано?",
    answer: "2012",
    deckId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    question: "Первая авторская песня Челентано?",
    answer: "Прощай, я скажу тебе",
    deckId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cards", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cards", null, {});
  },
};
