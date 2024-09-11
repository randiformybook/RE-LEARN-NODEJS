const fs = require("fs/promises");
const path = require("path");
const validator = require("validator");

// location Directory File
const dirPath = path.join("./data");
const filePath = path.join(dirPath, "contact.json");

async function checkDir() {
  try {
    // check apakah Folder bernama DATA
    await fs.access(dirPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(dirPath, { recursive: true });
    } else {
      throw new Error("Gagal Pembuatan Folder : " + err);
    }
  }
  try {
    // check apakah ada terdapat file contacts.json atau tidak
    await fs.access(filePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.writeFile(filePath, "[]", "utf-8");
    } else {
      throw new Error("GAGAL MEMBUAT FILE : " + err);
    }
  }
}

async function loadFile() {
  const dataJson = await fs.readFile(filePath, "utf-8");
  if (!dataJson) return false;
  const dataBuffer = await JSON.parse(dataJson);
  return dataBuffer;
}

async function findContact(id) {
  const contacts = await loadFile();
  const contactFind = await contacts.filter((contact) => contact.id == id);
  const contact = contactFind[0];
  return contact;
}

async function addContact(data) {
  const contacts = await loadFile();
  await contacts.push(data);
  const updateBuffer = await Buffer.from(JSON.stringify(contacts));
  await fs.writeFile(filePath, updateBuffer);
}

async function deleteContact(id) {
  const contacts = await loadFile();
  const oldContacts = contacts.length;
  const newContacts = contacts.filter((contact) => contact.id !== id);
  console.log(newContacts);
  if (oldContacts > newContacts.length) {
    const updateBuffer = await Buffer.from(JSON.stringify(newContacts));
    await fs.writeFile(filePath, updateBuffer);
  } else {
    console.error(`Contact with ID ${id} not found.`);
  }
}

module.exports = {
  checkDir,
  loadFile,
  findContact,
  addContact,
  deleteContact,
};
