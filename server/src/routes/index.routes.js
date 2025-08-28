const router = require('express').Router();
const deckRoutes = require('./deck.routes');
const formatResponse = require('../utils/formatResponse');

router.use('/decks', deckRoutes);

router.use((req, res) => {
  res.status(404).json(formatResponse(404, 'Not found'));
});

module.exports = router;