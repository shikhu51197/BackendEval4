const jwt = require("jsonwebtoken");

const Authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "mypostapp", (err, decoded) => {
      if (decoded) {
        const userId = decoded.myapp;
        req.body.myapp = userId;
        next();
      } else {
        res.send("Please login first");
      }
    });
  } else {
    res.send("Please login");
  }
};
module.exports = { Authenticate };
