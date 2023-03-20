const multer = require('multer')
const path = require('path')

//userUpload
const imageConfig = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, path.join(__dirname, "..", "/uploads/user"));
    },
    filename: (req, file, callback) => {
        var ext = file.originalname.substring(file.originalname.indexOf("."));
        callback(null, `image_${Date.now()}.${file.originalname}`);
    }
})

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("only image is allowed"));
    }
}

const upload = multer({
    storage: imageConfig,
    fileFilter: isImage
})

//reviewUpload
const imageReviewConfig = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, path.join(__dirname, "..", "/uploads/review"));
    },
    filename: (req, file, callback) => {
        var ext = file.originalname.substring(file.originalname.indexOf("."));
        callback(null, `image_${Date.now()}.${file.originalname}`);
    }
})

const isReviewImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("only image is allowed"));
    }
}

const reviewUpload = multer({
    storage: imageReviewConfig,
    fileFilter: isReviewImage
})

//productUpload
const imageProductConfig = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, path.join(__dirname, "..", "/uploads/product"));
    },
    filename: (req, file, callback) => {
        var ext = file.originalname.substring(file.originalname.indexOf("."));
        callback(null, `image_${Date.now()}.${file.originalname}`);
    }
})

const isProductImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("only image is allowed"));
    }
}

const productUpload = multer({
    storage: imageProductConfig,
    fileFilter: isProductImage
})

module.exports = {
    upload,
    reviewUpload,
    productUpload
}