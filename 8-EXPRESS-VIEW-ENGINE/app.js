const express = require("express");
const app = express();
const path = require("path");
const { title } = require("process");

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, "public")));

// gunakan ejs
app.set("view engine", "ejs");

// Home Route
// -------Home Page Route---------
app.get("/", (req, res) => {
  const karyawan = [
    { id: 127, nama: "Randi", jabatan: "Junior Programmer" },
    { id: 257, nama: "Putri", jabatan: "Dokter" },
    { id: 337, nama: "Ilyas", jabatan: "Captain-Pilot" },
  ];
  res.render("index", {
    title: "Halaman Home",
    content: "Ini adalah HOMEPAGE, first of Page",
    karyawan,
  });
});
// -------About Page Route---------
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});
// -------Contact Page Route---------
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
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
