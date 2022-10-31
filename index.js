const express = require('express');
const app = express();
const recipeRouter = require('./addRecipe/recipes/recipeRouter')

app.use(express.static("./addRecipe/public"));
app.use(express.static("./addRecipe/data/uploads"));
app.use('/api', recipeRouter);

app.listen(3410, () => {
    console.log('Port is listing');
});