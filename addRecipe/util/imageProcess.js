const fs = require("fs");
const sharp = require("sharp");

const imageProcess = async (req, id) => {
    fs.access('./addRecipe/data/uploads/', (err) => {
        if (err) {
            fs.mkdirSync('./addRecipe/data/uploads/');
        }
    });

    //set format picture
    const formatedName = req.file.originalname.split(' ').join('-')
    const fileName = `${id}-${formatedName}`;
    try {
        await sharp(req.file.buffer)
            .resize({width: 374, height:191})
            .toFile('./addRecipe/data/uploads/' + req.file.originalname);
    } catch (error) {
        console.log('Error while processing', error)
    }

    return fileName;
}

module.exports = imageProcess;