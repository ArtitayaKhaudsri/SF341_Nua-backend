const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');
const Recipe = require('./recipes');

const storage = multer.memoryStorage();
const uploads = multer({storage})

router.post(
    '/create',
    uploads.single("picture"),
    uploads.single("pictureStep1"),
    uploads.single("pictureStep2"),
    uploads.single("pictureStep3"),
    uploads.single("pictureStep4"),
    uploads.single("pictureStep5"),
    uploads.single("pictureStep6"),
    uploads.single("pictureStep7"),
    uploads.single("pictureStep8"),
    uploads.single("pictureStep10"),
    async (req, res) => {
        fs.access('./addRecipe/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./addRecipe/data/uploads/');
            }
        });
        /*const id = new Recipe().createId();
        //set format picture
        const formatedName = req.file.originalname.split(' ').join('-')
        const fileName = `${id}-${formatedName}`;*/
        const ah = await sharp(req.file.buffer)
            .resize(374,191)
            .toFile('./addRecipe/data/uploads/' + req.file.originalname);
            console.log(ah)
        res.send('submit successful');
});

module.exports = router;