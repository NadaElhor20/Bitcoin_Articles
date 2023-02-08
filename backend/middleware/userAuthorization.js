const customError = require("../Helper/ErrorHandeler.js");
const User = require("../Models/user");

const AuthorizedUser = async (req, res, next) => {
  const authentication = req.headers.authentication;
  try {
    if (!authentication) throw new customError("not authorized", 401);
    const user = await User.getUserFromToken(authentication);
    if (!user) throw new customError("not authorized", 401);
    next();
  } catch (error) {
    if (error.name == "JsonWebTokenError")
      throw new customError("invalid token ,sign in again", 498);
    next(error);
  }
};

module.exports = AuthorizedUser;
