const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const { query, validationResult, body } = require("express-validator");
const {
  checkDir,
  loadFile,
  findContact,
  addContact,
  deleteContact,
} = require("./utilities/contact-system");
const { validateContact } = require("./utilities/validator");

// Menyajikan file statis dari folder 'public'

// gunakan ejs
app.set("view engine", "ejs");

// -------Third Party Middleware---------
// Menggunakan Express Layout
app.use(expressLayouts);
// Menyajikan file statis dari folder 'public'
app.use(express.static("public"));
// express.urlencoded({ extended: true }) berfungsi untuk Mengurai data yang dikirimkan dalam format URL-encoded
app.use(express.urlencoded({ extended: true }));
// Mengurai data yang dikirimkan dalam format JSON, contoh ketika menerimah API dari Browser, saat penggunaan Fecth dsb
app.use(express.json());

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
    cssLink: ["/"],
    karyawan,
  });
});
// -------About Page Route---------
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman About",
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
    cssLink: ["/css/btn-add-button.css", "/css/table.css"],
    contacts,
  });
});
// -------Add Contact Page Route---------
app.get("/contact/add", async (req, res) => {
  res.render("page-contact-add", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman Add Contact Form",
    cssLink: ["/css/page-add-contact.css", "/css/btn-add-button.css"],
  });
});

// -------Proses ammbil data dari Add Contact---------
app.post(
  "/contact",
  // validation & Sanitization
  validateContact(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("page-contact-add", {
        layout: "layouts/main-layout.ejs",
        title: "Halaman Add Contact Form",
        cssLink: ["/css/page-add-contact.css", "/css/btn-add-button.css"],
        errors: errors.array(),
        inputData: req.body,
      });
    }
    const { nama, id, nohp, email } = req.body;
    await addContact({ nama, id, nohp, email });
    res.redirect("/contact");
  }
);

app.post("/contact/delete/:id", async (req, res) => {
  try {
    await deleteContact(req.params.id);
    res.redirect("/contact");
  } catch (err) {
    console.error("Failed to delete contact:", err);
    res.status(500).send("Internal Server Error");
  }
});

// -------Contact Detail by ID Page Route---------
app.get("/contact/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(404).send("Contact not Found");
  }
  const contact = await findContact(req.params.id);
  res.render("page-contact-detail", {
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
