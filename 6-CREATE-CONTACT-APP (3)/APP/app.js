const yargs = require("yargs");
const {
  checkDir,
  saveFile,
  loadFile,
  searchContact,
  listContact,
  deleteContact,
} = require("./system");
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

yargs.command("list", "Melihat Daftar Daftar Kontak", async () =>
  listContact()
);

yargs.command(
  "find",
  "Mencari Kontak yang sudah terdaftar berdasarkan Nama atau ID di Daftar Contact",
  (yargs) => {
    yargs.option("nama", {
      alias: "n",
      describe: "Nama Kontak",
      type: "string",
    });
    yargs.option("id", {
      alias: "id",
      describe: "ID Anggota",
      type: "string",
    });
  },
  async (argv) => {
    if (argv.nama || argv.id) {
      await searchContact(argv.nama, argv.id);
    } else if (argv) {
      await listContact();
    }
  }
);
yargs.command(
  "delete",
  "Menghapus sebuah contact berdasarkan nama lengkap",
  (yargs) => {
    yargs.option("nama", {
      alias: "n",
      describe: "Nama Kontak",
      type: "string",
      demandOption: true,
    });
  },
  async (argv) => {
    await deleteContact(argv.nama);
  }
);

yargs.parse();
