import { getDataFromFirestore, createProduct } from "./assets/js/Firestore.js";

import express from "express";
import bodyParser from "body-parser";
const app = express();

//middleware
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));

// 1. templating
app.set("view engine", "pug");

app.get("/", async (req, res) => {
  let products = await getDataFromFirestore();
  console.log(products);

  res.render("index", { products: products });
});

app.get("/createProduct", (req, res) => {
  res.render("createProduct");
});

app.post("/productCreated", (req, res) => {
  console.log(req.body)
  const productName = req.body["input-name"];
  const productID = req.body["input-product-id"];
  const amount = req.body["input-amount"];
  const unit = req.body["dropdown-unit"];

  let product = {
    productName: productName,
    productID: productID,
    amount: amount,
    unit: unit,
  };

  createProduct(product)


  console.log(productName);
  console.log(productID);
  console.log(amount);
  console.log(unit);

  res.redirect("/createProduct");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/createVan", (req, res) => {
  res.render("createVan");
});

app.get("/createElectrician", (req, res) => {
  res.render("createElectrician");
});

app.listen(4000);
console.log("listening on port 4000");
