const mongoose = require('mongoose')
const productModelSchema = new mongoose.Schema({
    productDescription: {
        type: String,
        required: true,
    },
    productImage: {
        type: [String],
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    offerPrice: {
        type: Number,
        //required : true,
    },
    features: {
        type: String,
        required: true,
    },
    specifications: {
        type: String,
        required: true,
    },
    productRating: {
        type: Number,
        default: "0"
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'vendor'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
})
productModelSchema.set('timestamps', true)
module.exports = mongoose.model('product', productModelSchema)