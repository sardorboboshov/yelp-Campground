const User = require("../models/user");
const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.renderRegister = async (req, res) => {
    res.render("users/register");
};

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registereduser = await User.register(user, password);
        req.login(registereduser, (err) => {
            if (err) return next();
            req.flash("success", "welcome to yelp-camp");
            res.redirect("/campgrounds");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("register");
    }
};

module.exports.renderLogin = (req, res) => {
    res.render("users/login");
};

module.exports.login = (req, res) => {
    req.flash("success", "welcome back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "GoodBye");
    res.redirect("/campgrounds");
};
