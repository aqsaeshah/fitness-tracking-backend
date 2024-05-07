const jwt = require("jsonwebtoken");

const secret_key =
  "6bd0ee7c879c1b90e7ff73cedf5d562d0b5cdcddef0bcafa41acf47d99acb775";

function authenticateJWT(req, res, next) {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.send(err);
    }
    req.user = user;
    console.log(req.user);
    next();
  });
}


module.exports = authenticateJWT;
