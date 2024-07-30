const { isUtf8 } = require("node:buffer");
const { fstat } = require("node:fs");
const fs = require("node:fs/promises");
const { stdin } = require("node:process");
const { json } = require("node:stream/consumers");

// Contact Folder & File
const dirPath = "./DATA";
const dirFile = `${dirPath}/contact.json`;
// ----------------------
// Readline Interface
const readline = require("readline/promises");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// ---------------------

const runAppContact = async () => {
  try {
    await checkDir(); // check Directory tersedia apa tidak
    const dataKaryawan = await pertanyaan(); //Jalankan Pertanyaan
    await saveFile(dataKaryawan); //Ketika pertanyaan sudah di jawab, File akan mengUpdate ke file JSON
    const dataLoad = await loadFile(); //Ketika setelah di Save, ingin melihat semua isi dari JSON
    console.log(dataLoad);
  } catch (err) {
    console.log(err.message);
  } finally {
    rl.close();
  }
};
runAppContact();

async function pertanyaan() {
  const nama = await rl.question("Silahkan masukan nama Anda : ");
  const id = await rl.question("Silahkan masukan id Anda : ");
  const pekerjaan = await rl.question("Silahkan masukan pekerjaan Anda : ");
  const noHP = await rl.question("Silahkan masukan no HP Anda : ");
  const dataKaryawan = { nama, id, pekerjaan, noHP };
  return dataKaryawan;
}

async function checkDir() {
  // Check & Create Directory Folder
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
    if (err.code === "ENOENT")
      await fs.writeFile(
        dirFile,
        "[]",
        "utf-8"
      ); // kalau belum, File akan dibuat
    else throw new Error("Gagal membuat File");
  }
}

// Fungsi ketika pertanyaan sudah di Jawab dan Lekas di Simpan ke File Contact.Json
async function saveFile(answer) {
  const dataJSON = await loadFile();
  answer.noHP = parseInt(answer.noHP);
  dataJSON.push(answer);
  const updateBuffer = await Buffer.from(JSON.stringify(dataJSON));
  await fs.writeFile(dirFile, updateBuffer);
}

// Fungsi ketika ingin memanggil/load dari isi File contact
async function loadFile() {
  const dataJSON = await fs.readFile(dirFile, "utf-8");
  const dataBuffer = JSON.parse(dataJSON);
  return dataBuffer;
}
