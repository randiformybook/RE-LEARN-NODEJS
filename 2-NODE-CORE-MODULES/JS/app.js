const { isUtf8 } = require("node:buffer");
const fs = require("node:fs/promises");
const { stdin } = require("node:process");
const { json } = require("node:stream/consumers");

// const jsonObject = {
//   nama: "Randi Himawan",
//   umur: 36,
//   pekerjaan: "Programmer",
// };
// const jsonString = JSON.stringify(jsonObject);
// const dataBuffer = Buffer.from(jsonString);

// const saveFile = async () => {
//   try {
//     await fs.writeFile("../OPTION/data.json", dataBuffer);
//     console.log("Data Berhasil di Simpan");
//   } catch (err) {
//     console.log(err.message);
//   }
// };
// saveFile();

// const openFile = async () => {
//   try {
//     const dataBuffer = await fs.readFile("../OPTION/data.json", "utf-8");
//     // const dataJson = dataBuffer.toString();
//     console.log(dataBuffer);
//   } catch (err) {
//     console.log(err);
//   }
// };
// openFile();

const readline = require("readline/promises");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const pertanyaan = async () => {
  try {
    const nama = await rl.question("Silahkan masukan nama Anda : ");
    const umur = await rl.question("Silahkan masukan umur Anda : ");
    const pekerjaan = await rl.question("Silahkan masukan pekerjaan Anda : ");
    const dataKaryawan = { nama, umur, pekerjaan };
    // --- Save data Kontak ketika sudah mengisi File
    await saveFile(dataKaryawan);
    // console.log(`Data Berhasil di Simpan !`);
    const dataLoad = await loadFile();
    console.log(dataLoad);
    // console.log(`Data Berhasil di Baca ! : ${JSON.stringify(dataLoad)}`);
  } catch (err) {
    console.log(err.message);
  } finally {
    rl.close();
  }
};
pertanyaan();

async function saveFile(answer) {
  const dataJSON = await loadFile();
  answer.umur = parseInt(answer.umur);
  dataJSON.push(answer);
  const updateBuffer = await Buffer.from(JSON.stringify(dataJSON));
  fs.writeFile("../OPTION/data.json", updateBuffer);
}

async function loadFile() {
  const dataJSON = await fs.readFile("../OPTION/data.json", "utf-8");
  if (!dataJSON) return [];
  const dataBuffer = JSON.parse(dataJSON);
  return dataBuffer;
}
