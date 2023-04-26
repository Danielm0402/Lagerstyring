const express = require("express");
const app = express();

// 1. templating
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render(
    "index"

    //   , {
    //     name: "Ole-Bengt",
    //   }
  );
});

app.listen(4000);
console.log("listening on port 4000");
