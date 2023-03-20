const express = require('express');
const router = express.Router()
// const { ValidationError } = require('@hapi/joi/lib/errors');
const review = require('../controller/reviewController')
const { reviewUpload } = require('../middlewares/imageStorage')
// const validation = require('../validation/reviews/review_validation')

router.post('/addReview/:userId/:productId',reviewUpload.array("reviewPic"),review.addReview)
router.get('/reviewList',review.reviewList)
router.delete('/deleteReview/:reviewId',review.deleteReview)
router.patch('/editreview/:reviewId',review.editReview)


module.exports = router;