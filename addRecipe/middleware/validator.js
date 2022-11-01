const {check, validationResult} = require('express-validator');
const {log} = require("sharp/lib/libvips");

const exceptedType = ['boiled', 'puff', 'fried', 'other'];
const exceptedLevel = ['hard', 'medium', 'easy'];

const validator = [
    check('menuName').trim().not().isEmpty().withMessage('menu name is required!'),
    check('title').trim().not().isEmpty().withMessage('should have title'),
    check('type').isIn(exceptedType).withMessage('Select at least one type'),
    check('level').isIn(exceptedLevel).withMessage('Select at least one level'),
    check('rawMaterial').trim().not().isEmpty().withMessage('should have raw material'),
    check('step1').trim().not().isEmpty().withMessage('should have step1')
]

const result = (req, res, next) => {
    const result = validationResult(req);
    const hasError = !result.isEmpty();

    if (hasError) {
        const error = result.array()[0].msg;
        res.json({ success: false, message: error });
    }

    next();
};

const validateFile = (req, res, next) => {
    const exceptedFileType = ['png', 'jpg', 'jpeg'];
    if (!req.file) {
        return res.json({success: false, message: 'Image is required!'});
    }

    const fileExtension = req.file.mimetype.split('/').pop();
    if (!exceptedFileType.includes(fileExtension)) {
        return res.json({success: false, message: "Image file is not valid!"});
    }
    next();
}

module.exports = {
    validator,
    result,
    validateFile
}
