const express = require('express');
const router = express.Router();
const uploads = require('../middleware/multer');
const {createRecipes} = require('../controller/recipe');
const {validator, result} = require('../middleware/validator');

router.post(
    '/create',
    uploads.single("picture"),
    validator,
    result,
    createRecipes
)

module.exports = router;