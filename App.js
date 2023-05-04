import {
  getProductsFromDb,
  getProductFromDb,
  deleteProductFromDb,
  updateAmountToProduct,
  addVanToDb,
  getVansFromDb,
} from "./database/Firestore.js";

import Controller from "./controllers/controller.js";

import express from "express";
import bodyParser from "body-parser";
import { collectionGroup } from "firebase/firestore";
const app = express();

const controller = new Controller();

//middleware
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// 1. templating
app.set("view engine", "pug");

//---------------ROUTES-----------------------------------------------------------------------------------------------------------------------------

//---------------GET REQUESTS------------------------------------------------------------------------
app.get("/", async (req, res) => {
  const products = await getProductsFromDb();
  const vans = await getVansFromDb();

  res.render("index", { products: products, vans: vans });
});

// opens /createProduct form to create a form
app.get("/createProduct", (req, res) => {
  res.render("createProduct");
});


app.get("/admin", async (req, res) => {
  const vans = await getVansFromDb();
  res.render("admin", {vans: vans});
});


app.get("/createVan", (req, res) => {
  res.render("createVan");
});

app.get("/createelectrician", (req, res) => {
  res.render("createElectrician");
});

app.get("/test", (req, res) => {
  res.send('Dette var en god test');
  console.log("testestest")
})

app.get("/deleteVan", (req, res) => {
  res.render("deleteVan")
})


//--------------PUT REQUESTS--------------------------------------------------------------------------------------------------

// delete Product from database
app.put("/deleteProduct/:productid", async (req, res) => {
  const productId = req.params.productid;

  console.log("afasdg ", productId);

  const product = await deleteProductFromDb(productId);
  res.send(product);
});

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
    await updateAmountToProduct(1, productId);
  } else if (action === "decrease") {
    await updateAmountToProduct(-1, productId);
  }
  const product = await getProductFromDb(productId);
  res.send(product);
});

//----------POST REQUEST--------------------------------------------------------------------------

app.post("/product", (req, res) => {
  const productName = req.body["input-name"];
  const productID = req.body["input-produkt-id"];
  const amount = req.body["input-amount"];
  const unit = req.body["dropdown-unit"];

  const product = {
    productName: productName,
    productId: productID,
    amount: parseInt(amount),
    unit: unit,
  };

  controller.createProductToDB(product);

  res.redirect("/createProduct");
});

app.post("/van/", async (req, res) => {
  const van = await controller.createVan(req.body.licensePlate, req.body.owner)
  res.redirect('/createvan')
});

app.listen(4000);
console.log("listening on port 4000");
