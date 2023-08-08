const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const auth_header = req.header("auth-token");
  const auth_token = auth_header && auth_header.split(" ")[1];
  if (auth_token == null)
    return res.status(401).send("auth token not found !! Access Forbidden");
  //verify token
  try {
    const data = jwt.verify(auth_token, process.env.SECRET_KEY);
    req.user = "verified";
    next();
  } catch (err) {
    res.status(400).send("Access forbidden auth token wrong");
  }
};

module.exports = { auth };
