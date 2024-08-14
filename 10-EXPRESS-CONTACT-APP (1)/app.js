// Memanggil Express
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// menyajikan Folder Public
app.use(express.static("public"));
// Menggunakan EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
