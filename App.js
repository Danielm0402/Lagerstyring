import { getDataFromFirestore } from "./assets/js/Firestore.js";

import express from "express";
const app = express();

app.use(express.static("assets"));

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

app.get("/form", (req, res) => {
  res.render("addProduct");
});

app.listen(4000);
console.log("listening on port 4000");
