const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");
const { validatePost } = require("../middleware/validatePost");
const handleValidation = require("../middleware/handleValidation");

router.get("/", controller.list);

router.get("/create", controller.showCreate);
router.post(
  "/create",
  validatePost,
  handleValidation("post"),
  controller.create,
);

router.post("/:id/delete", controller.remove);

module.exports = router;
