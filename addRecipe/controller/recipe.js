const Recipe = require("../recipes/recipes");
const imageProcess = require("../util/imageProcess");

const createRecipes = async (req, res) => {

    const recipe = new Recipe();
    const id = recipe.createId();

    try {
        const imageName = await imageProcess(req, id);
        await recipe.create(req.body, id, imageName);
        await imageProcess(req, id);
        res.send("submit successful");
    } catch (error) {
        console.log('Error while creating recipe', error.message);
    }
}

module.exports = {
    createRecipes
}