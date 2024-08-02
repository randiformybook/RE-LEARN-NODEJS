const yargs = require("yargs");
const { checkDir, saveFile, loadFile, searchContact } = require("./system");
const { validate } = require("./validator");
const chalk = require("chalk");

yargs
  .command(
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
      await checkDir();
      const isValid = await validate(buffer);
      if (isValid) await saveFile(buffer);
    }
  )
  .demandCommand();

yargs.command("list", "Melihat Daftar Daftar Kontak", async () => {
  const contacts = await loadFile();
  console.log(chalk.bgCyan.bold(`Daftar Kontak : `));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
});

yargs.command(
  "find",
  "Mencari Kontak yang sudah terdaftar berdasarkan Nama di Daftar Contact",
  (yargs) => {
    yargs.option("nama", {
      alias: "n",
      describe: "Nama Kontak",
      type: "string",
      demandOption: true,
    });
  },
  async (argv) => {
    await searchContact(argv.nama);
  }
);

yargs.parse();
