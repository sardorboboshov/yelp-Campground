const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_400");
});

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    location: String,
    price: Number,
    description: String,
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ["Point"], // 'location.type' must be 'Point'
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
},opts);

CampgroundSchema.virtual("properties.popUpMarkUp").get(function () {
    return `<a href="/campgrounds/${this.id}">${this.title}</a> 
    <p>${this.description.substring(0,20)}...</p>`;
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({
            id: {
                $in: doc.reviews,
            },
        });
    }
});

// CampgroundSchema.post("findOneAndDelete", async function (doc) {
//     if (doc) {
//         await Review.deleteMany({
//             _id: {
//                 $in: doc.reviews,
//             },
//         });
//     }
// });

module.exports = mongoose.model("Campground", CampgroundSchema);
