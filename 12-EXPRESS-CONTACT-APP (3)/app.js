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
// flash message
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");

// gunakan ejs
app.set("view engine", "ejs");
// Middleware Session
app.use(
  session({
    secret: "flash123456",
    resave: false,
    saveUninitialized: true,
  })
);

// -------Third Party Middleware---------
// connect flash
app.use(flash());
// Menggunakan Express Layout
app.use(expressLayouts);
// Menyajikan file statis dari folder 'public'
app.use(express.static("public"));
// express.urlencoded({ extended: true }) berfungsi untuk Mengurai data yang dikirimkan dalam format URL-encoded
app.use(express.urlencoded({ extended: true }));
// Mengurai data yang dikirimkan dalam format JSON, contoh ketika menerimah API dari Browser, saat penggunaan Fecth dsb
app.use(express.json());
// Menggunakan Method-Override untuk bisa membuat method button tidak hanya get atau post, melainkan bisa yang lain seperti App.put dan App.delete
app.use(methodOverride("_method"));

//Middleware untuk mengakses pesan flash di view
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg") || null;
  res.locals.delete_msg = req.flash("delete_msg") || null;
  res.locals.error_msg = req.flash("error_msg") || null;
  next();
});

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
    jsLink: ["/"],
    karyawan,
  });
});
// -------About Page Route---------
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman About",
    cssLink: ["/"],
    jsLink: ["/"],
  });
});
// -------Contact Page Route---------
app.get("/contact", async (req, res) => {
  await checkDir();
  const contacts = await loadFile();
  res.render("contact", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman Contact",
    cssLink: [
      "/css/btn-add-button.css",
      "/css/table.css",
      "/css/flash-message.css",
    ],
    jsLink: ["/js/flashMessage.js"],
    contacts,
  });
});
// -------Add Contact Page Route---------
app.get("/contact/add", async (req, res) => {
  res.render("page-contact-add", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman Add Contact Form",
    cssLink: ["/css/page-add-contact.css", "/css/btn-add-button.css"],
    jsLink: ["/"],
  });
});

// -------Proses ambil data dari Add Contact---------
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
        jsLink: ["/"],
      });
    }
    const { nama, id, nohp, email } = req.body;
    await addContact({ nama, id, nohp, email });
    // Menampilkan Pesan Flash kalau Success
    req.flash("success_msg", "Data Berhasil Ditambahkan");
    res.redirect("/contact");
  }
);

// -------Update Contact Route by ID Contact---------
app.get("/contact/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await findContact(id);
    res.render("page-contact-update", {
      layout: "layouts/main-layout.ejs",
      title: "Halaman Update Contact Form",
      cssLink: ["/css/page-add-contact.css", "/css/btn-add-button.css"],
      jsLink: ["/"],
      contact,
    });
  } catch (err) {
    console.log(err);
  }
});
// // -------Proses Men-Delete Contact---------
// app.post("/contact/delete/:id", async (req, res) => {
//   try {
//     await deleteContact(req.params.id);
//     req.flash("delete_msg", "Kontak berhasil di Hapus");
//     res.redirect("/contact");
//   } catch (err) {
//     console.error("Failed to delete contact:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.delete("/contact/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteContact(id);
    req.flash("delete_msg", "Kontak berhasil di Hapus");
    res.redirect("/contact");
  } catch (err) {
    console.error("Failed to delete contact :", err);
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
    jsLink: ["/"],
    contact,
  });
});

// Apabila URL halaman tidak di temukan
app.use("/", (req, res) => {
  res.sendStatus(404);
});

// Hotsname & Port
const port = "3000";
const host = "127.0.0.1";

app.listen(port, host, () => {
  console.log(`Server running on ${host}:${port}`);
});
