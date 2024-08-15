// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }
//   const tokenWithoutBearer = token.startsWith("Bearer ")
//     ? token.slice(7)
//     : token;

//   try {
//     const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Remove "Bearer " from the token if it exists
  const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;

  try {
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(401).json({ msg: "Token is not valid" });
  }
};
