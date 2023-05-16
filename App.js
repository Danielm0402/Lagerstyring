import {
  getProductsFromDb,
  getProductFromDb,
  deleteProductFromDb,
  updateAmountToProduct,
  addVanToDb,
  getVansFromDb,
  deleteVanFromDb,
  getUsersFromDb,
  getVanProducts,
  deleteUserFromDb,
  getUserVan,
  updateAssignedUserToVan,
  updateVan,
  updateUser,
} from "./database/Firestore.js";

import Controller from "./controllers/controller.js";

import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import { collectionGroup, documentId } from "firebase/firestore";
import { async } from "@firebase/util";
const app = express();

const controller = new Controller();

//middleware
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({ secret: "MYSECRETKEY", resave: false, saveUninitialized: true })
);

// 1. templating
app.set("view engine", "pug");

//---------------ROUTES-----------------------------------------------------------------------------------------------------------------------------

//---------------GET REQUESTS------------------------------------------------------------------------

app.get("/", async (req, res) => {
  let isLoggedIn = false;
  let errorMessage = null;

  if (req.session.isLoggedIn) {
    isLoggedIn = true;
  }

  if (req.session.errorMessage) {
    errorMessage = req.session.errorMessage;
    console.log("haysi", errorMessage);
    req.session.errorMessage = null; // Clear the error message after displaying it
  }

  const user = req.session.user;
  let role = "";

  let products = [];

  if (user && user.role === "electrician") {
    const van = await getUserVan(user.employeeId);
    role = user.role;
    if (van) {
      products = await getVanProducts(van.licensePlate);
    }
  } else if (user && user.role === "admin") {
    role = user.role;
    products = await getProductsFromDb();
  }
  const vans = await getVansFromDb();

  console.log(vans)

  res.render("index", {
    products: products,
    user: user,
    vans: vans,
    knownUser: isLoggedIn,
    role: role,
    errorMessage: errorMessage,
  });
});

app.get("/logout", (req, res) => {
  req.session.isLoggedIn = false;
  console.log("logged out");
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("loginForm");
});

app.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const users = await getUsersFromDb();

  const user = users.find((u) => u.username === username);

  if (user && user.password === password) {
    console.log("logged in as: " + user.username);
    req.session.isLoggedIn = true;
    req.session.user = user;
  } else {
    req.session.isLoggedIn = false;
    req.session.errorMessage = "Wrong username or password.";
    console.log("sdf", req.session.errorMessage);

    // req.session.isLoggedIn = false;

    // res.locals.errorMessage = "Wrong username or password.";
    // console.log("dsf", res.locals.errorMessage);
  }
  res.redirect("/");
});

// opens /createProduct form to create a form
app.get("/createProduct", async (req, res) => {
  const vans = await getVansFromDb();

  res.render("createProduct", { vans: vans });
});

// app.get("/createProduct/:licenseplate", async (req, res) => {
//   const licensePlate = req.params.licenseplate;
//   console.log("lasfk", licensePlate);
//   const van = await controller.getVan(licensePlate);
//   res.render("createProduct", { van: van });
// });

//3. step---------------------------------------
app.get("/admin", async (req, res) => {
  const vans = await getVansFromDb();
  const users = await getUsersFromDb();
  res.render("admin", { vans: vans, users: users });
});

app.post("/van/:licensePlate/products", async (req, res) => {
  const licenseplate = req.params.licensePlate;
  const vanProducts = await controller.getVanProducts(licenseplate);
  res.send(vanProducts);
});

app.post("/products", async (req, res) => {
  const productIds = req.body.productIds;
  console.log(req.body.productIds);
});

app.get("/van/:licenseplate/products", async (req, res) => {
  const licenseplate = req.params.licenseplate;
  const vanProducts = await controller.getVanProducts(licenseplate);
});

app.get("/createVan", (req, res) => {
  res.render("createVan");
});

app.get("/createCompany", (req, res) => {
  res.render("createCompany");
});

app.get("/createUser", (req, res) => {
  res.render("createUser");
});

app.get("/createUser", (req, res) => {
  res.render("createUser");
});

app.get("/assignUserToVan", async (reg, res) =>{
  const vans = await getVansFromDb();
  const users = await getUsersFromDb();
  res.render("assignUserToVan", {users: users, vans: vans});
})

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

app.put("/deleteUser/:employeeId", async (req, res) => {
  const employeeId = req.params.employeeId;
  console.log("delete User", employeeId);

  const user = await deleteUserFromDb(employeeId);
  res.send(user);
});


app.put("/updateVan/:licensePlate", async (req, res)=>{
  const licensePlate = req.body.licensePlate;
  const employeeId = req.body.employeeId;

  const updatedVan = await controller.updateVan(licensePlate, employeeId)
  const updatedUser = await controller.updateUser(employeeId, licensePlate)



  console.log(licensePlate, employeeId);

  

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

  // else if (action === "edit") {
  //   const newAmount = prompt("Enter the new amount:"); // Using prompt() function
  // }

  const product = await getProductFromDb(productId);
  res.send(product);
});

//----------POST REQUEST--------------------------------------------------------------------------

app.post("/product/", async (req, res) => {
  const productName = req.body["input-name"];
  const productId = req.body["input-produkt-id"];
  const amount = parseInt(req.body["input-amount"]);
  const unit = req.body["dropdown-unit"];
  const licensePlate = req.body["select-van"];
  console.log("nummerplade: ", licensePlate);

  const product = await controller.createProduct(
    productName,
    productId,
    amount,
    unit
  );
  const van = await controller.getVan(licensePlate);
  await controller.addProductToVan(product, van);

  res.redirect("/createProduct");
});

app.post("/van", async (req, res) => {
  await controller.createVan(req.body.vanNumber ,req.body.licensePlate);
  res.redirect("/admin");
});

//5. step kom tilbage her. Hvad skal den have af paramtre.
app.post("/user", async (req, res) => {
  const { name, employeeId, username, password } = req.body;
  const role = req.body.admin || req.body.electrician;
  await controller.createUser(name, employeeId, username, password, role);

  res.redirect("/admin");
});

app.post("/company", async (req, res) => {
  await controller.createCompany(
    req.body.companyName,
    req.body.cvrNr,
    req.body.contactPersonName,
    req.body.contactPersonNumber
  );
  res.redirect("/login");
});

app.post("/product", async (req, res) => {});

app.listen(4000);
console.log("listening on port 4000");
