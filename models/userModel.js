const pool = require("../db/pool");

const create = async (firstName, lastName, username, password) => {
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, username, password],
  );
  return result.rows[0];
};

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

module.exports = {
  create,
  getById,
  getByUsername,
  getAll,
};
