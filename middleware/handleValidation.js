const { validationResult } = require("express-validator");

function handleValidation(view, getData = null) {
  return async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const extraData = getData ? await getData(req) : {};

      return res.render(view, {
        errors: errors.array(),
        oldInput: req.body,
        ...extraData,
      });
    }

    next();
  };
}

module.exports = handleValidation;
