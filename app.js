const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`listening on port ${PORT}`);
});

const links = [{ href: "/" }];

app.get("/", (req, res) => {
  res.render("index");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).send(error.message);
});
