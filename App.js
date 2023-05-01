import { getDataFromFirestore } from "./assets/js/Firestore.js";

import express from "express";
import bodyParser from "body-parser";
const app = express();

//middleware
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended: true}));

// 1. templating
app.set("view engine", "pug");

app.get("/", async (req, res) => {
  // let varer = [
  //   { varenavn: "Stikkontakt 'A'" },
  //   { varenavn: "Stikkontakt 'B'" },
  //   { varenavn: "Stikkontakt 'C'" },
  //   { varenavn: "Stikkontakt 'D'" },
  // ];

  let varer = await getDataFromFirestore();
  console.log(varer);

  res.render("index", { varer: varer });
});

app.get("/createProduct", (req, res) => {
  res.render("addProduct");
});

app.post("/productCreated", (req, res) => {
  const productName = req.body.inputName
  const productID = req.body.inputProductID
  const amount = req.body.inputAmount
  const unit = req.body.dropdownUnit

  console.log(productName)
  console.log(productID)
  console.log(amount)
  console.log(unit)

  res.redirect("/createProduct")
})

app.listen(4000);
console.log("listening on port 4000");
