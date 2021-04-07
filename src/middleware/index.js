const bcrypt = require("bcrypt");

exports.hashPassword = async (req, res, next) => {
  if ("password" in req.body) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
  }

  next();
};
