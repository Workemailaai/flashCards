const router = require("express").Router();
const deckRoutes = require("./deck.routes");
const cardRoutes = require("./card.routes");
const roundRoutes = require("./round.routes");
const userRoutes = require("./user.routes");
const formatResponse = require("../utils/formatResponse");
const authRoutes = require("./auth.routes");

router.use("/decks", deckRoutes);
router.use("/cards", cardRoutes);
router.use("/rounds", roundRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);


router.use((req, res) => {
  res.status(404).json(formatResponse(404, "Not found"));
});

module.exports = router;
