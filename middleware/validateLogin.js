const { body } = require("express-validator");

exports.validateLogin = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username required")
    .isLength({ max: 15 })
    .withMessage("Username must be at most 15 characters long"),
  body("password").trim().notEmpty().withMessage("Password requried"),
];
