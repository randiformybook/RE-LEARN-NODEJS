const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "127.0.0.1:3306",
  user: "root",
  password: "123456",
  database: "contact_app",
});

async function loadFile() {
  const [rows] = await pool.query("SELECT * FROM contacts");
  return rows;
}

async function findContact(id) {
  const [rows] = await pool.query("SELECT * FROM contacts WHERE id = ?", [id]);
  return rows[0] || null;
}

async function addContact(data) {
  const [rows] = await pool.query("INSERT INTO contacts SET ?", [data]);
  return rows;
}

async function deleteContact(id) {
  await pool.query("DELETE FROM contacts WHERE id = ?", [id]);
}

async function updateContact(id, updatedData) {
  await pool.query("UPDATE contacts SET ? WHERE id = ?", [updatedData, id]);
}

module.exports = {
  pool,
  loadFile,
  findContact,
  addContact,
  deleteContact,
  updateContact,
};
