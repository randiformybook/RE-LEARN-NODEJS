const { stdin } = require("node:process");

// Readline Interface
const readline = require("readline/promises");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// ---------------------

async function pertanyaan() {
  const nama = await rl.question("Silahkan masukan nama Anda : ");
  const id = await rl.question("Silahkan masukan id Anda : ");
  const pekerjaan = await rl.question("Silahkan masukan pekerjaan Anda : ");
  const noHP = await rl.question("Silahkan masukan no HP Anda : ");
  const dataKaryawan = { nama, id, pekerjaan, noHP };
  return dataKaryawan;
}

module.exports = { pertanyaan, rl };
