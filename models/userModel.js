const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

async function create(firstName, lastName, username, password) {
  const hashedPassword = await bcrypt.hash(password, 12);

  const { rows } = await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, username, hashedPassword],
  );

  return rows[0];
}

const getById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return result.rows[0];
};

const getByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  return result.rows[0];
};

const getAll = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const makeMember = async (id) => {
  const result = await pool.query(
    "UPDATE users SET is_member=TRUE WHERE id=$1 RETURNING *",
    [id],
  );
  return result.rows[0];
};

const makeAdmin = async (id) => {
  const result = await pool.query(
    "UPDATE users SET is_admin=TRUE WHERE id=$1 RETURNING *",
    [id],
  );
  return result.rows[0];
};

module.exports = {
  create,
  getById,
  getByUsername,
  getAll,
  makeMember,
  makeAdmin,
};
