const { loadFile } = require("./system");
const validator = require("validator");
const chalk = require("chalk");

// validasi id
async function validate(answer) {
  const id = answer.id;
  if (validator.isNumeric(id) === false) {
    console.log(chalk.red.bold("ID harus berupa Angka"));
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
  const dataJSON = await loadFile();
  const duplicate = dataJSON.find(
    (data) => data.nama === answer.nama || data.id === answer.id
  );
  if (duplicate) {
    console.log(
      chalk.red.bold(
        "Kontak yang anda masukin sudah terdaftar, Silahkan melakukan pengecekan ulang !"
      )
    );
    return false;
  }
  return true;
}

module.exports = { validate };
