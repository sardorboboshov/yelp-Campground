const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const mongoose = require("mongoose");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("database connected");
});

const sample = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            author: "610372aed800ba42b16ffd00",
            geometry: { 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ], 
                type: "Point" },
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis laudantium aliquid obcaecati tempore necessitatibus excepturi perferendis. ",
            price: price,
            images: [
                {
                    url: "https://res.cloudinary.com/dmwneuo8w/image/upload/v1627810387/YelpCamp/xt1vhsa0flvcmqgz0m9p.jpg",
                    filename: "YelpCamp/xt1vhsa0flvcmqgz0m9p",
                },
                {
                    url: "https://res.cloudinary.com/dmwneuo8w/image/upload/v1627810392/YelpCamp/nlyjprmey7mjmk4ofteu.jpg",
                    filename: "YelpCamp/nlyjprmey7mjmk4ofteu",
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
