const express = require('express');
const router = express.Router();
const uploads = require('../middleware/multer');
const {createRecipes, getAllRecipes, getSingleRecipe, getRecipeByType} = require('../controller/recipe');
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

router.get('/recipes/single/:id', getSingleRecipe);
router.get('/recipes/:type', getRecipeByType);
router.get('/recipes/update/:id/:like', updateLike);


module.exports = router;
