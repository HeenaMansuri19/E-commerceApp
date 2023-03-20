const mongoose = require('mongoose')
const cartModelSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        default: "0"
    },
    deliveryStatus: {
        type: Boolean,
        required: true,
        default: false,
    },
    paymentStatus: {
        type: Boolean,
        required: true,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
})
cartModelSchema.set('timestamps', true)
module.exports = mongoose.model('cart', cartModelSchema)