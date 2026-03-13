#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  username VARCHAR (255) UNIQUE NOT NULL,
  is_member BOOLEAN DEFAULT FALSE NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE NOT NULL,
  password VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL,
  title VARCHAR (255) NOT NULL,
  message VARCHAR (255) NOT NULL,

  CONSTRAINT fk_posts_users
  FOREIGN KEY (user_id)
  REFERENCES users(id)
);
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("done");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
