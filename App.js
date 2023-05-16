import Controller from "./controllers/controller.js";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";

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

  if (req.session.isLoggedIn) {
    isLoggedIn = true;

    const user = req.session.user;
    let role = "";
    let products = [];

    if (user && user.role === "electrician") {
      const van = await controller.getUserVan(user.employeeId);
      role = user.role;
      if (van) {
        products = await controller.getVanProducts(van.licensePlate);
      }
    } else if (user && user.role === "admin") {
      role = user.role;
      products = await controller.getProducts();
    }
    const vans = await controller.getVans();

    res.render("index", {
      products: products,
      user: user,
      vans: vans,
      knownUser: isLoggedIn,
      role: role,
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.session.isLoggedIn = false;
  console.log("logged out");
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  let errorMessage = null;

  if (req.session.errorMessage) {
    errorMessage = req.session.errorMessage;
    console.log("haysi", errorMessage);
    req.session.errorMessage = null; // Clear the error message after displaying it
  }

  res.render("loginForm", { errorMessage: errorMessage });
});

app.post("/", async (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  const users = await controller.getUsers();

  const user = users.find((u) => u.username === username);

  if (user && user.password === password) {
    console.log("logged in as: " + user.username);
    req.session.isLoggedIn = true;
    req.session.user = user;
  } else {
    req.session.isLoggedIn = false;
    req.session.errorMessage = "Wrong username or password.";
  }
  res.redirect("/");
});

// opens /createProduct form to create a form
app.get("/createProduct", async (req, res) => {
  const vans = await controller.getVans();

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
  const vans = await controller.getVans();
  const users = await controller.getUsers();
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
  const vans = await controller.getVans();
  const users = await controller.getUsers();
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

  const product = await controller.deleteProduct(productId);
  res.send(product);
});

app.put("/deleteVan/:licensePlate", async (req, res) => {
  // const licensePlate = req.params.licensePlate;
  const licensePlate = req.params.licensePlate;
  console.log("afasdg ", licensePlate);

  const van = await controller.deleteVan(licensePlate);
  res.send(van);
});

app.put("/deleteUser/:employeeId", async (req, res) => {
  const employeeId = req.params.employeeId;
  console.log("delete User", employeeId);

  const user = await controller.deleteUser(employeeId);
  res.send(user);
});


app.put("/updateVan/:licensePlate", async (req, res)=>{
  const licensePlate = req.body.licensePlate;
  const employeeId = req.body.employeeId;
  console.log(licensePlate)
  console.log(employeeId)

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
  // const newAmount = req.body.newAmount;

  const newAmount = req.body.newAmount ? req.body.newAmount : 0;
  console.log("hej", newAmount);

  if (action === "increase") {
    await controller.adjustProductAmount(productId, 1);
  } else if (action === "decrease") {
    await controller.adjustProductAmount(productId, -1);
  } else if (action === "edit") {
    await controller.adjustProductAmount(productId, parseInt(newAmount));
  }

  const product = await controller.getProduct(productId);
  res.send(product);
});

//----------POST REQUEST--------------------------------------------------------------------------

app.post("/product", async (req, res) => {
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
  console.log(van)
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

app.listen(4000);
console.log("listening on port 4000");
