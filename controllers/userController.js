const userModel = require("../models/userModel");

const create = async (req, res) => {
  const { firstName, lastName, password } = req.body;
  await userModel.create(firstName, lastName, password);
  res.redirect("/");
};

module.exports = {
  create,
};
