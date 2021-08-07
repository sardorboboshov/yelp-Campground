const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connection is open now!!!");
  })
  .catch((err) => {
    console.log("mongo error!!!");
    console.log(err);
  });

// const p=new Product({
//     name:'greyfruit',
//     price:1.99,
//     category:'fruit'
// })

// p.save().then(p=>{
//     console.log(p)
// })
// .catch(e => {
//     console.log(e)
// })

const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "Organic Goddes Melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Organic Mini Seedles Wtmelon",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "Organic Celery",
    price: 1.5,
    category: "vegetable",
  },
  {
    name: "Chocolate Whole Milk",
    price: 2.69,
    category: "dairy",
  },
];
