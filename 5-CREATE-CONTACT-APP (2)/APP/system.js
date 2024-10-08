const fs = require("node:fs/promises");
// Contact Folder & File
const dirPath = "../DATA";
const dirFile = `${dirPath}/contact.json`;
const validator = require("validator");
const chalk = require("chalk");
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

  // validasi id
  const id = answer.id;
  if (validator.isNumeric(id) == false) {
    console.log("ID harus berupa Angka");
    return false;
  }

  // validasi No Handphone
  const noHP = answer.noHp;

  if (validator.isMobilePhone(noHP, ["id-ID"]) == false) {
    console.log(
      chalk.red.bold(
        "No Handphone yang anda masukan tidak sesuai dengan Format No telepon Indonesia, Silahkan untuk check kembali.Terimah kasih !"
      )
    );
    return false;
  }

  // check duplicate contact
  const duplicate = dataJSON.find(
    (data) => data.nama === answer.nama || data.id === answer.id
  );
  if (duplicate) {
    console.log(
      chalk.red.bold(
        "Contact yang anda masukin sudah terdaftar, Silahkan melakukan pengecekan ulang"
      )
    );
    return false;
  }

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

module.exports = {
  checkDir,
  saveFile,
  loadFile,
};
