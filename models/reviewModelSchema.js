const mongoose = require('mongoose')
const reviewModelSchema = new mongoose.Schema(
    {
        addReview: {
            type: String,
            required: true
        },
        reviewPic: {
            type: [String],
        
        },
        rating: {
            type: Number,
            // required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        isActive: {
            type: String,
            required: true,
            default: true
        }
    })

reviewModelSchema.set('timestamps', true)
module.exports = mongoose.model('review', reviewModelSchema)