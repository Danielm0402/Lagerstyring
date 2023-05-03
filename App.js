import {
  getDataFromFirestore,
  getDbProduct,
  deleteDBProduct,
  updateAmountToProduct,
  createProduct,
  addVanToDb,
} from "./assets/js/Firestore.js";

import express from "express";
import bodyParser from "body-parser";
import { collectionGroup } from "firebase/firestore";
const app = express();

//middleware
app.use(express.static("assets"));
app.use(express.static("controllers"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// 1. templating
app.set("view engine", "pug");

app.get("/", async (req, res) => {
  let products = await getDataFromFirestore();
  // console.log(products);

  res.render("index", { products: products });
});

// opens /createProduct form to create a form
app.get("/createProduct", (req, res) => {
  res.render("addProduct");
});

// delete Product from database
app.put("/deleteProduct/:productid", async (req, res) => {
  const productId = req.params.productid;

  console.log("afasdg ", productId);

  const product = await deleteDBProduct(productId);
  res.send(product);
});

// DECREASE PRODUCT AMOUNT

/*
  Når der kommer et put request to denne adresse
  gem productId og action fra request.body
  alt efter hvilken action der er i bodyen
  skal requestet opdatere product amount 1 op 
  eller 1 ned
  derefter sender requestet det opdaterede
  product fra databasen til klienten
*/
app.put("/products/:productid/amount", async (req, res) => {
  const productId = req.params.productid;
  const action = req.body.action;

  if (action === "increase") {
    console.log("increase");
    await updateAmountToProduct(1, productId);
  } else if (action === "decrease") {
    console.log("decrease");
    await updateAmountToProduct(-1, productId);
  }
  const product = await getDbProduct(productId);
  res.send(product);
});

app.post("/productCreated", (req, res) => {
  console.log("req.body: ", req.body);

  const productName = req.body["input-name"];
  const productID = req.body["input-produkt-id"];
  const amount = req.body["input-amount"];
  const unit = req.body["dropdown-unit"];

  const product = {
    productName: productName,
    productId: productID,
    amount: amount,
    unit: unit,
  };

  createProduct(product);

  res.redirect("/createProduct");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/createVan", (req, res) => {
  res.render("createVan");
});

app.get("/createelectrician", (req, res) => {
  res.render("createElectrician");
});

app.post("/createvan/:vankey", (req, res) => {
  const van = req.body.van;
  addVanToDb(van);
});

app.listen(4000);
console.log("listening on port 4000");
