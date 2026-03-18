const pool = require("../db/pool");

const create = async (userId, title, message) => {
  const result = await pool.query(
    "INSERT INTO posts (user_id, title, message) VALUES ($1, $2, $3) RETURNING *",
    [userId, title, message],
  );
  return result.rows[0];
};

const getById = async (id) => {
  const result = await pool.query("SELECT * FROM posts WHERE id=$1", [id]);
  return result.rows[0];
};

const getAll = async () => {
  const result = await pool.query(
    "SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id",
  );
  return result.rows;
};

const remove = async (id) => {
  const result = await pool.query("DELETE FROM posts WHERE id=$1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};

module.exports = {
  create,
  getById,
  getAll,
  remove,
};
