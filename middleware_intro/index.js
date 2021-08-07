const express = require("express");
const { Error } = require("mongoose");
const app = express();
const morgan = require("morgan");

const AppError = require("./AppError");

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method.toUpperCase(), req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("i love dogs");
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chicken") {
    next();
  }
  // res.send("sorry you need a password, bruh!!!");
  throw new AppError("password required", 401);
};

// app.use((req, res, next) => {
//   console.log("my first middleware!");
//   return next();
//   console.log("my 1.5 middleware!!!");
// });

// app.use((req, res, next) => {
//   console.log("my second middleware!");
//   next();
//   console.log("my 2.5 middleware!!!");
// });

app.get("/", (req, res) => {
  console.log(`REQUEST DATE:${req.requestTime}`);
  res.send("home page");
});

app.get("/error", (req, res) => {
  chicken.fly();
});

app.get("/dogs", (req, res) => {
  console.log(`REQUEST DATE:${req.requestTime}`);
  res.send("woof woof");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("my secret is bla bla bla...");
});

app.get("/admin", (req, res) => {
  throw new AppError("you are not an admin", 403);
});

app.use((req, res) => {
  res.status(404).send("not found");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "something went wrong!!!" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("App is running on localhost:3000");
});
