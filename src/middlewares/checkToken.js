import jwt from "jsonwebtoken";
import secret from "../config/secret";

/**
 * Middleware: Only check token status; do not reject
 * @param {Object} req
 * @param {Object} res
 * @callback next
 */
const checkToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.tokenValid = false;
    return next();
  }

  const token = authHeader.substring(7);
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      req.tokenValid = false;
      return next();
    }

    req.tokenValid = true;
    next();
  });
};

export default checkToken;
