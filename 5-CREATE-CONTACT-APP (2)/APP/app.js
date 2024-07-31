const yargs = require("yargs");
const { checkDir, saveFile, loadFile } = require("./system");

yargs.command(
  "add",
  "Menambahkan Kontak ke contact.json",
  (yargs) => {
    yargs.option("nama", {
      alias: "n",
      describe: "Nama Kontak",
      type: "string",
      demandOption: true,
    });
    yargs.option("id", {
      alias: "id",
      describe: "ID Anggota",
      type: "string",
      demandOption: true,
    });
    yargs.option("pekerjaan", {
      alias: "p",
      describe: "Nama Pekerjaan",
      type: "string",
      demandOption: false,
    });
    yargs.option("noHp", {
      alias: "hp",
      describe: "No Handphone",
      type: "string",
      demandOption: true,
    });
  },
  async (argv) => {
    const { nama, id, pekerjaan, noHp } = argv;
    const buffer = { nama, id, pekerjaan, noHp };
    console.log(buffer);
    await checkDir();
    await saveFile(buffer);
  }
);

yargs.parse();
