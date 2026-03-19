const postModel = require("../models/postModel");

const list = async (req, res) => {
  const posts = await postModel.getAll();
  res.render("index", { posts });
};

const showCreate = async (req, res) => {
  res.render("post");
};

const create = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const { title, message } = req.body;
  await postModel.create(req.user.id, title, message);

  res.redirect("/");
};

const remove = async (req, res) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).send("Forbidden");
  }

  await postModel.remove(req.params.id);
  res.redirect("/");
};

module.exports = {
  list,
  showCreate,
  create,
  remove,
};
