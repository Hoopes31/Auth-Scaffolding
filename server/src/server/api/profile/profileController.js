const logger = require("../../util/logger");

exports.root = (req, res) => {
  //Send data to client
  let user = req.user;
  res.status(200).json({ user: user });
  return;
};
