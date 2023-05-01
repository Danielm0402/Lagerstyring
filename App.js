import { getDbProducts, createProduct, getDbProduct, updateAmountToProduct } from "./assets/js/Firestore.js";
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";


const app = express();

//middleware
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

// 1. templating
app.set("view engine", "pug");

app.get("/", async (req, res) => {
  let products = await getDbProducts();
  res.render("index", { products: products });
  // console.log(products)
});

app.get("/createProduct", (req, res) => {
  res.render("createProduct");
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
app.put('/product/:productid/amount', async (req, res) => {
  const productId = req.params.productid
  const action = req.body.action;
  
  if (action === "increase") {
    
    await updateAmountToProduct(1, productId)

  } else if (action === "decrease") {
    
    await updateAmountToProduct((-1), productId)

  }
  const product = await getDbProduct(productId)
  res.send(product)
})

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
