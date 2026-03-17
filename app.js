const path = require("node:path");
const express = require("express");
const app = express();
require("dotenv").config;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.get("/", (req, res) => res.render("index"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
