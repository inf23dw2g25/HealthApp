const passport = require("passport");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

function isAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Autenticação necessária para continuar" });
  }
  const [type, token] = req.headers.authorization.split(" ");
  if (type !== "Bearer") {
    return res.status(401).json({ message: "Tipo de autenticação inválido" });
  }
  next();
}
function isAuthenticatedBool(req, res, next) {
  if (!req.headers.authorization) {
    return false;
  }
  const [type, token] = req.headers.authorization.split(" ");
  if (type !== "Bearer") {
    return false;
  }
  return true;
}
module.exports = { isLoggedIn, isAuthenticated, isAuthenticatedBool };
