const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");
const { validatePost } = require("../middleware/validatePost");
const handleValidation = require("../middleware/handleValidation");
const { ensureAuthenticated, ensureAdmin } = require("../middleware/auth");

router.get("/", controller.list);

router.get("/create", ensureAuthenticated, controller.showCreate);

router.post(
  "/create",
  ensureAuthenticated,
  validatePost,
  handleValidation("post"),
  controller.create,
);

router.post("/:id/delete", ensureAdmin, controller.remove);

module.exports = router;
