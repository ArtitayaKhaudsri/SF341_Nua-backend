const express = require('express');
const router = express.Router();
const userLogin = require('../controller/login');

router.post('/login', userLogin)

module.exports = router;