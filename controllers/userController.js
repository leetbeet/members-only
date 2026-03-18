const userModel = require("../models/userModel");

const showCreate = async (req, res) => {
  res.render("sign-up");
};

const create = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  await userModel.create(firstName, lastName, username, password);
  res.redirect("/");
};

const showLogin = async (req, res) => {
  res.render("login");
};

module.exports = {
  showCreate,
  create,
  showLogin,
};
