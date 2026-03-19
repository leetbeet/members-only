const userModel = require("../models/userModel");

const showCreate = async (req, res) => {
  res.render("sign-up");
};

const create = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  try {
    await userModel.create(firstName, lastName, username, password);
    res.redirect("/");
  } catch (err) {
    if (err.code === "23505") {
      return res.render("sign-up", {
        errors: [{ msg: "Username already exists" }],
        oldInput: req.body,
      });
    }

    throw err;
  }
};

const showLogin = async (req, res) => {
  res.render("login");
};

module.exports = {
  showCreate,
  create,
  showLogin,
};
