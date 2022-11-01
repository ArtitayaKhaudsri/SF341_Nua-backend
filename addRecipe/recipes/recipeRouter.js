const express = require('express');
const router = express.Router();
const uploads = require('../middleware/multer');
const {createRecipes} = require('../controller/recipe');
const {validator, result, validateFile} = require('../middleware/validator');

router.post(
    '/create',
    uploads.single("picture"),
    validator,
    result,
    validateFile,
    createRecipes
)

module.exports = router;