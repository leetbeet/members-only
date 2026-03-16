const postModel = require("../models/postModel");

const list = async (req, res) => {
  const posts = await postModel.getAll();
  res.render("index", { posts });
};

const showCreate = async (req, res) => {
  res.render("post");
};

const create = async (req, res) => {
  const { title, message } = req.body;
  const { id } = req.user;

  await postModel.create(id, title, message);
  res.redirect("/");
};

const showRemove = async (req, res) => {
  const post = await postModel.getById(req.params.id);
  res.render("removePost", { post });
};

const remove = async (req, res) => {
  await postModel.remove(req.params.id);
  res.redirect("/");
};

module.exports = {
  list,
  showCreate,
  create,
  showRemove,
  remove,
};
