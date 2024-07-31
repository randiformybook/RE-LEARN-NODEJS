const fs = require("node:fs/promises");
// Contact Folder & File
const dirPath = "../DATA";
const dirFile = `${dirPath}/contact.json`;
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
  if (isNaN(answer.noHP)) throw new Error("No HP harus berupa Angka");
  answer.noHP = "0" + parseInt(answer.noHP);
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

module.exports = {
  checkDir,
  saveFile,
  loadFile,
};
