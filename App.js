const express = require("express");
const app = express();

app.use(express.static("assets"));

// 1. templating
app.set("view engine", "pug");

app.get("/", (req, res) => {
  let varer = [
    { varenavn: "Stikkontakt 'A'" },
    { varenavn: "Stikkontakt 'B'" },
    { varenavn: "Stikkontakt 'C'" },
    { varenavn: "Stikkontakt 'D'" },
  ];
  res.render("index", { varer: varer });
});


app.listen(4000);
console.log("listening on port 4000");
