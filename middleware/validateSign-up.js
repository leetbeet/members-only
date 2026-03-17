const { body } = require("express-validator");

exports.validateSignup = [
  body("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("First name required")
    .isLength({ max: 20 })
    .withMessage("First name must be at most 20 characters long"),
  body("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Last name required")
    .isLength({ max: 20 })
    .withMessage("Last name must be at most 20 characters long"),
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username required")
    .isLength({ max: 15 })
    .withMessage("Username must be at most 15 characters long"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 12 })
    .withMessage("Password must be atleast 12 characters long"),
];
