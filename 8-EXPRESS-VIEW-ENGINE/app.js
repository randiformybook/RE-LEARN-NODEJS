const express = require("express");
const app = express();
const path = require("path");

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, "public")));

// gunakan ejs
app.set("view engine", "ejs");

// Home Route
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
// Apabila halaman tidak di temukan
app.use("/", (req, res) => {
  res.sendStatus(404);
});

// Hotsname & Port
const port = "3000";
const host = "127.0.0.1";

app.listen(port, host, () => {
  console.log(`Server running on ${host}:${port}`);
});
