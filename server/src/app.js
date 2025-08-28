const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;





app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});