const reviewModelSchema = require("../models/reviewModelSchema")
const mongoose = require('mongoose');
const { reset } = require("nodemon");


//1.addReview
const addReview = async (req, res) => {
    try {
        const isReviewExists = await reviewModelSchema.findOne({ userId: req.params.userId });
        const product = await reviewModelSchema.findOne({ productId: req.params.productId });
        const addReview = await new reviewModelSchema(req.body)
        const filePath = req.files.map(({filename})=>`/uploads/${filename}`);
        addReview.reviewPic = filePath;
        if (isReviewExists && product) {
            res.status(409).json({
                success: false,
                message: "Review is already exists you can give another review",
            });
        } else {
            const addReview = await new reviewModelSchema(req.body)
            addReview.userId = req.params.userId,
                addReview.productId = req.params.productId
            try {
                addReview.save()
                res.status(201).json({
                    success: true,
                    message: "Thank you for your review.Review saved successfully "
                });
            } catch (err) {
                res.status(400).json({
                    success: false,
                    message: "error occur" + err.message
                });
            }
        }
    } catch (err) {
        console.log(err.message)
    }
}

//2.reviewList
const reviewList = async (req, res) => {
    try {
        const existsReview = await reviewModelSchema.find();
        res.status(200).json({
            success: true,
            message: "The list of review are here",
            "data": existsReview
        })
    } catch (error) {
        console.log(error.message);
    }
}

//3.deleteReview
const deleteReview = async (req, res) => {
    const reviewId = req.params.cartId;
    try {
        const reviewDelete = await reviewModelSchema.findByIdAndDelete(reviewId, { $set: req.body });
        res.status(201).json({
            success: true,
            message: "Review is deleted successfully!!",
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
}


//4.editReview
const editReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        const newReview = await reviewModelSchema.findByIdAndUpdate(reviewId, { $set: req.body });
        newReview.save();
        res.status(201).json({
            success: true,
            message: "Review edited successfully",
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        })
    }
}

module.exports = {
    addReview,
    reviewList,
    deleteReview,
    editReview
}
