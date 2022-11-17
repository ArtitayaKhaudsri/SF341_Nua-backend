const express = require('express');
const router = express.Router();
const fav = require('../controller/fav.js')

router.post("/fav", fav)

module.exports = router;