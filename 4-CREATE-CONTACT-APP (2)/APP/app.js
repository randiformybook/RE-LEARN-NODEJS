const { checkDir, saveFile, loadFile } = require("./system");
const { pertanyaan, rl } = require("./questioner");

const runAppContact = async () => {
  try {
    // check Directory tersedia apa tidak
    await checkDir();
    //Jalankan Pertanyaan
    const dataKaryawan = await pertanyaan();
    //Ketika pertanyaan sudah di jawab, File akan mengUpdate ke file JSON
    await saveFile(dataKaryawan);
    //Ketika setelah di Save, ingin melihat semua isi dari JSON
    const dataLoad = await loadFile();
    console.log(dataLoad);
  } catch (err) {
    console.log(err.message);
  } finally {
    rl.close();
  }
};
runAppContact();
