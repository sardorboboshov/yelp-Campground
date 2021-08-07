const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const { isLoggedin, validateCampground, isAuthor } = require("../middleware");

router
    .route("/")
    .get(catchAsync(campgrounds.index))
    .post(
        isLoggedin,
        upload.array("image"),
        validateCampground,
        catchAsync(campgrounds.createCampground)
    );

router.get("/new", isLoggedin, campgrounds.renderNewForm);

router
    .route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(
        isLoggedin,
        upload.array("image"),
        isAuthor,
        validateCampground,
        catchAsync(campgrounds.updateCampground)
    )
    .delete(isAuthor, isLoggedin, catchAsync(campgrounds.deleteCampground));

router.get(
    "/:id/edit",
    isLoggedin,
    isAuthor,
    catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
