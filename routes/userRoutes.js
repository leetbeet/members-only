const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/userController");
const { validateLogin } = require("../middleware/validateLogin");
const { validateSignup } = require("../middleware/validateSign-up");
const handleValidation = require("../middleware/handleValidation");

router.get("/sign-up", controller.showCreate);
router.post(
  "/sign-up",
  validateSignup,
  handleValidation("sign-up"),
  controller.create,
);

router.get("/login", controller.showLogin);
router.post(
  "/login",
  validateLogin,
  handleValidation("login"),
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        return res.render("login", {
          errors: [{ msg: info.message }],
          oldInput: req.body,
        });
      }

      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect("/");
      });
    })(req, res, next);
  },
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
