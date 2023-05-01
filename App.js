import { getDataFromFirestore } from "./assets/js/Firestore.js";

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
  const productName = req.body.inputName;
  const productID = req.body.inputProductID;
  const amount = req.body.inputAmount;
  const unit = req.body.dropdownUnit;

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
