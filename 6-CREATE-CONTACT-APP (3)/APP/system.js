const fs = require("node:fs/promises");
// Contact Folder & File
const dirPath = "../DATA";
const dirFile = `${dirPath}/contact.json`;
const chalk = require("chalk");
const { array } = require("yargs");
// ----------------------

// Check & Create Directory Folder
async function checkDir() {
  try {
    await fs.access(dirPath); // check apakah Folder Direktory (DATA) sudah ada apa belum
  } catch (err) {
    if (err.code === "ENOENT")
      await fs.mkdir(dirPath); // kalau belum, Folder akan dibuat
    else throw new Error("Gagal membuat Folder : " + err);
  }
  // Check & Create Directory File
  try {
    await fs.access(dirFile); // check apakah File (contact.json) di dalam Folder (DATA) sudah ada apa belum
  } catch (err) {
    if (err.code === "ENOENT") await fs.writeFile(dirFile, "[]", "utf-8");
    // kalau belum, File akan dibuat
    else throw new Error("Gagal membuat File");
  }
}

// Fungsi ketika pertanyaan sudah di Jawab dan Lekas di Simpan ke File Contact.Json
async function saveFile(answer) {
  const dataJSON = await loadFile();
  dataJSON.push(answer);
  const updateBuffer = await Buffer.from(JSON.stringify(dataJSON));
  await fs.writeFile(dirFile, updateBuffer);
  console.log(chalk.green.bold("Data Anda sudah berhasil di Simpan"));
}

// Fungsi ketika ingin memanggil/load dari isi File contact
async function loadFile() {
  const dataJSON = await fs.readFile(dirFile, "utf-8");
  const dataBuffer = JSON.parse(dataJSON);
  return dataBuffer;
}

async function listContact() {
  const contacts = await loadFile();
  console.log(chalk.bgCyan.bold(`Daftar Kontak : `));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
}

// Fungsi mencari contact di contact.json berdasarkan nama
async function searchContact(nama, id) {
  const contacts = await loadFile();
  let contact;
  console.log("Mencari contact dengan", nama ? `nama ${nama}` : `ID:${id}`);
  // Debug log
  if (nama) {
    contact = contacts.filter((contact) =>
      contact.nama.toLowerCase().includes(nama.toLowerCase())
    );
  } else {
    contact = contacts.filter((contact) => contact.id === id);
  }
  if (contact && contact.length > 0) {
    console.log("Contact di temukan");
    contact.forEach((n, i) => {
      console.log(n);
    });
  } else {
    console.log(chalk.red.bold("Kontak tidak ditemukan"));
  }
}

async function deleteContact(nama) {
  const contacts = await loadFile();
  const oldContacts = contacts.length;
  const newContact = await contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  if (oldContacts > newContact.length) {
    const updateBuffer = await Buffer.from(JSON.stringify(newContact));
    await fs.writeFile(dirFile, updateBuffer);
    console.log(
      chalk.greenBright.bold(
        `Kontak yang berdasarkan Nama ${nama} sudah berhasil di Hapus!`
      )
    );
  } else {
    console.log(
      chalk.red.bold(`Kontak berdasarkan nama ${nama} tidak ditemukan`)
    );
  }
}

module.exports = {
  checkDir,
  saveFile,
  loadFile,
  searchContact,
  listContact,
  deleteContact,
};
