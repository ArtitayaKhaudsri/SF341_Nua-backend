const express = require('express');
const router = express.Router();
const uploads = require('../middleware/multer');
const {createRecipes, getAllRecipes} = require('../controller/recipe');
const {validator, result, validateFile} = require('../middleware/validator');

router.post(
    '/create',
    uploads.single("picture"),
    validator,
    result,
    validateFile,
    createRecipes
)
//check all recipes at http://localhost:3410/api/recipes
router.get('/recipes', getAllRecipes);

module.exports = router;