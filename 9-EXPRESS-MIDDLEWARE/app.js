const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const morgan = require("morgan");
// const path = require("path");

// Menyajikan file statis dari folder 'public'
app.use(express.static("public"));

// gunakan ejs
app.set("view engine", "ejs");

// Third-party Middleware
// ---> Express Layout
app.use(expressLayouts);
// ---> Request Time
const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.requestTime);
  next();
};
app.use(requestTime);

// ---> Morgan
app.use(morgan("dev"));

// Home Route
// -------Home Page Route---------
app.get("/", (req, res) => {
  const karyawan = [
    { id: 127, nama: "Randi", jabatan: "Junior Programmer" },
    { id: 257, nama: "Putri", jabatan: "Dokter" },
    { id: 337, nama: "Ilyas", jabatan: "Captain-Pilot" },
  ];
  res.render("index", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman Home",
    karyawan,
  });
});
// -------About Page Route---------
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman About",
  });
});
// -------Contact Page Route---------
app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman Contact",
  });
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
