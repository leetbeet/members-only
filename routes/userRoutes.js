const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/userController");
const { validateLogin } = require("../middleware/validateLogin");
const { validateSignup } = require("../middleware/validateSign-up");
const handleValidation = require("../middleware/handleValidation");

router.get("/sign-up", controller.showCreate);
router.post("/sign-up", validateSignup, handleValidation("sign-up"));

router.get("/login", controller.showLogin);
router.post(
  "/login",
  validateLogin,
  handleValidation("login"),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
);
