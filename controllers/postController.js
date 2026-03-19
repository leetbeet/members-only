const postModel = require("../models/postModel");

const list = async (req, res, next) => {
  try {
    const posts = await postModel.getAll();
    res.render("index", { posts });
  } catch (err) {
    next(err);
  }
};

const showCreate = async (req, res, next) => {
  try {
    res.render("post");
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    if (!req.user) return res.redirect("/login");

    const { title, message } = req.body;
    await postModel.create(req.user.id, title, message);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    if (!req.user || !req.user.is_admin) {
      return res.status(403).send("Forbidden");
    }

    await postModel.remove(req.params.id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  list,
  showCreate,
  create,
  remove,
};
