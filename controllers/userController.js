const userModel = require("../models/userModel");

const showCreate = async (req, res, next) => {
  try {
    res.render("sign-up");
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
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
    next(err);
  }
};

const showLogin = async (req, res, next) => {
  try {
    res.render("login");
  } catch (err) {
    next(err);
  }
};

const makeMember = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).send("Unauthorized");
    await userModel.makeMember(req.user.id);
    res.status(200).send("OK");
  } catch (err) {
    next(err);
  }
};

const makeAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.is_member)
      return res.status(401).send("Unauthorized");
    await userModel.makeAdmin(req.user.id);
    res.status(200).send("OK");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  showCreate,
  create,
  showLogin,
  makeMember,
  makeAdmin,
};
