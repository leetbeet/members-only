const userModel = require("../models/userModel");

const showCreate = async (req, res) => {
  res.render("sign-up");
};

const create = async (req, res) => {
  const { firstName, lastName, password } = req.body;
  await userModel.create(firstName, lastName, password);
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
