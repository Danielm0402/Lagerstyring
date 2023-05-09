import {
  getProductsFromDb,
  getProductFromDb,
  deleteProductFromDb,
  updateAmountToProduct,
  addVanToDb,
  getVansFromDb,
  deleteVanFromDb,
  getElectriciansFromDb,
  deleteElectricianFromDb,
  getUsersFromDb
} from "./database/Firestore.js";

import Controller from "./controllers/controller.js";

import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import { collectionGroup } from "firebase/firestore";
const app = express();

const controller = new Controller();

//middleware
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: 'MYSECRETKEY', resave: false, saveUninitialized: true}));

// 1. templating
app.set("view engine", "pug");

//---------------ROUTES-----------------------------------------------------------------------------------------------------------------------------

//---------------GET REQUESTS------------------------------------------------------------------------
app.get("/", async (req, res) => {
  const products = await getProductsFromDb();
  const vans = await getVansFromDb();
  let isLoggedIn = false;
  if (req.session.isLoggedIn) {
    isLoggedIn = true;
  }
  res.render("index", { products: products, vans: vans, knownUser: isLoggedIn});
});

app.get('/logout', (req, res) => {
  req.session.isLoggedIn = false;
  res.redirect('/')
})

app.get("/login", (req, res) => {
  res.render("loginForm", )
})

app.post('/', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const users = await getUsersFromDb();
  const user = users.find(u => u.username === username);

  if (user.password === password) {
    console.log("logged in!")
    req.session.isLoggedIn = true;
  }
  res.redirect('/') 

})

// opens /createProduct form to create a form
app.get("/createProduct", (req, res) => {
  res.render("createProduct");
});

app.get("/admin", async (req, res) => {
  const vans = await getVansFromDb();
  const electricians = await getElectriciansFromDb();
  res.render("admin", { vans: vans, electricians: electricians});
});

app.get('/van/:licenseplate/products', async (req, res) => {
  const licenseplate = req.params.licenseplate
  const vanProducts = await controller.getVanProducts(licenseplate)
  
})

app.get("/createVan", (req, res) => {
  res.render("createVan");
});

app.get("/createelectrician", (req, res) => {
  res.render("createElectrician");
});

app.get("/test", (req, res) => {
  res.send("Dette var en god test");
  console.log("testestest");
});

app.get("/deleteVan", (req, res) => {
  res.render("deleteVan");
});

//--------------PUT REQUESTS--------------------------------------------------------------------------------------------------

// delete Product from database
app.put("/deleteProduct/:productid", async (req, res) => {
  const productId = req.params.productid;

  console.log("afasdg ", productId);

  const product = await deleteProductFromDb(productId);
  res.send(product);
});

app.put("/deleteVan/:licensePlate", async (req, res) => {
  // const licensePlate = req.params.licensePlate;
  const licensePlate = req.params.licensePlate;
  console.log("afasdg ", licensePlate);

  const van = await deleteVanFromDb(licensePlate);
  res.send(van);
});

app.put("/deleteElectrician/:employeeId", async (req, res) => {
  const employeeId = req.params.employeeId;
  console.log("delete Electrician", employeeId);

  const electrician = await deleteElectricianFromDb(employeeId);
  res.send(electrician);
})

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

app.post("/product", async (req, res) => {
  const productName = req.body["input-name"];
  const productId = req.body["input-produkt-id"];
  const amount = parseInt(req.body["input-amount"]);
  const unit = req.body["dropdown-unit"];
  await controller.createProduct(productName, productId, amount, unit);

  res.redirect("/createProduct");
});

app.post("/van", async (req, res) => {
  await controller.createVan(req.body.licensePlate, req.body.owner)
  res.redirect("/admin");
});

app.post("/electrician", async (req, res) => {
  await controller.createElectrician(req.body.name, req.body.employeeId)
  res.redirect("/admin")
})

app.listen(4000);
console.log("listening on port 4000");
