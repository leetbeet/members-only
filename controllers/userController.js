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

const makeMember = async (req, res) => {
  if (!req.user) return res.status(401).send("Unauthorized");
  await userModel.makeMember(req.user.id);
  res.status(200).send("OK");
};

const makeAdmin = async (req, res) => {
  if (!req.user || !req.user.is_member)
    return res.status(401).send("Unauthorized");
  await userModel.makeAdmin(req.user.id);
  res.status(200).send("OK");
};

module.exports = {
  showCreate,
  create,
  showLogin,
  makeMember,
  makeAdmin,
};
