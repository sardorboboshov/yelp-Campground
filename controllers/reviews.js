const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    review.author = req.user.id;
    await review.save();
    await campground.save();
    req.flash("success", "Created new Review");
    res.redirect(`/campgrounds/${campground.id}`);
};

module.exports.deleteReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash("success", "Successfully Deleted that Review");
    res.redirect(`/campgrounds/${id}`);
}
