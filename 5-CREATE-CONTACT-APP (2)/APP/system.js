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
  // check duplicate contact
  const duplicate = dataJSON.find(
    (data) => data.nama === answer.nama || data.id === answer.id
  );
  if (duplicate) {
    console.log("Contact Sudah Ada");
    return false;
  }

  dataJSON.push(answer);
  const updateBuffer = await Buffer.from(JSON.stringify(dataJSON));
  await fs.writeFile(dirFile, updateBuffer);
  console.log("Data Anda sudah di Simpan");
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
