const Recipe = require("../recipes/recipes");
const imageProcess = require("../util/imageProcess");

const recipes = new Recipe();

const createRecipes = async (req, res) => {

    const id = recipes.createId();

    try {
        const imageName = await imageProcess(req, id);
        await recipes.create(req.body, id, imageName);
        res.json({success:true, message: 'Post create successfully.'})
        res.send("submit successful");
    } catch (error) {
        res.json({success:false, message: 'Something went wrong, server error!'});
        console.log('Error while creating recipe', error.message);
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const data = await recipes.getAll();
        res.json({sucess: true, recipes: data})
    } catch (error) {
        res.json({success:false, message: 'Something went wrong, server error!'});
        console.log('Error while getting all recipe', error.message);
    }
}

const getSingleRecipe = async (req, res) => {
    try {
        const data = await recipes.getSingle(req.params.id)
        if (!data) {
            return res.json({success:false, message: 'Post not found!'})
        }
        res.json({success:true, recipes: data})

    } catch (error) {
        res.json({success:false, message: 'Something went wrong, server error!'});
        console.log('Error while getting single recipe', error.message);
    }
}

const getRecipeByType = async (req, res) => {
    try {
        const data = await recipes.getByType(req.params.type)
        console.log(data)
        if (!data) {
            return res.json({success:false, message: 'Post not found!'})
        }
        res.json({success:true, recipes: data})
    } catch (error) {
        res.json({success:false, message: 'Something went wrong, server error!'});
        console.log('Error while getting recipes by type', error.message);
    }
}

module.exports = {
    createRecipes,
    getAllRecipes,
    getSingleRecipe,
    getRecipeByType
}