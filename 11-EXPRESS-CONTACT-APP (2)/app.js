const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const {
  checkDir,
  loadFile,
  findContact,
} = require("./utilities/contact-system");

// Menyajikan file statis dari folder 'public'
app.use(express.static("public"));

// gunakan ejs
app.set("view engine", "ejs");

// Third-party Middleware
app.use(expressLayouts);

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
    // currentPath: req.path,
    cssLink: ["/"],
    karyawan,
  });
});
// -------About Page Route---------
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman About",
    // currentPath: req.path,
    cssLink: ["/"],
  });
});
// -------Contact Page Route---------
app.get("/contact", async (req, res) => {
  await checkDir();
  const contacts = await loadFile();
  res.render("contact", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman Contact",
    // currentPath: req.path,
    cssLink: ["/css/btn-add-button.css", "/css/table.css"],
    contacts,
  });
});
// Contact Detail by ID
app.get("/contact/:id", async (req, res) => {
  const contact = await findContact(req.params.id);
  res.render("contact-detail", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman Detail Contact",
    cssLink: ["/css/contact-detail.css"],
    contact,
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
