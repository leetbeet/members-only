const { body } = require("express-validator");

exports.validatePost = [
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title required")
    .isLength({ max: 15 })
    .withMessage("Title must be at most 15 characters long"),
  body("message")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Message requried")
    .isLength({ max: 150 })
    .withMessage("Message must be at most 150 characters long"),
];
