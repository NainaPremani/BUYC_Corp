const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const isAuthenticated = async (req, res, next) => {
  let authToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      authToken = req.headers.authorization.split(" ")[1];
      const decodedtoken = jwt.verify(authToken, process.env.SECRET_KEY);

      // Get the user Data from the TOKEN => .select(-password will not include password)
      let userData = await userModel
        .findById(decodedtoken._id)
        .select("-password");
      if (!userData) {
        return res.status(401).send({ message: error });
      } else {
        req.user = userData;
        next();
      }
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  if (!authToken) {
    return res.status(401).send({ message: "Not Authorized" });
  }
};

module.exports = {
  isAuthenticated,
};
