const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews");
const { validateReview, isLoggedin, isReviewAuthor } = require("../middleware");
const ExpressError = require("../utils/ExpressError");

router.post("/", isLoggedin, validateReview, catchAsync(reviews.createReview));

router.delete(
    "/:reviewId",
    isLoggedin,
    isReviewAuthor,
    catchAsync(reviews.deleteReview)
);

module.exports = router;
