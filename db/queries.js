const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY added DESC",
  );
  return rows;
}

async function insertMessage(name, message) {
  await pool.query("INSERT INTO messages (name, message) VALUES ($1, $2)", [
    name,
    message,
  ]);
}

module.exports = {
  getAllMessages,
  insertMessage,
};
