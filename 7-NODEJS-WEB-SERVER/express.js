const express = require("express");
const app = express();
const path = require("path");

// Middleware untuk menangani file statis
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "home.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "about.html"));
});
app.get("/contact", (req, res) => {
  res.send("this is contact page !");
});

app.get("/product/:jenis/category/:kategori", (req, res) =>
  res.send(
    `Produtct : ${req.params.jenis} <br> category : ${req.params.kategori}`
  )
);

app.use("/", (req, res) => {
  res.sendStatus(404);
});

const port = 3000;
const hostname = "127.0.0.1";
app.listen(port, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
