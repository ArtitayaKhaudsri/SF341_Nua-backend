const express = require('express');
const router = express.Router();
const uploads = require('../middleware/multer');
const {createRecipes} = require('../controller/recipe');

router.post(
    '/create',
    uploads.single("picture"),
    createRecipes
)

module.exports = router;