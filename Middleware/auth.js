const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user.model.js");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.userToken;
  //   console.log(token);
  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You must be login to access this resource",
      });
    }
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    let userId = await UserModel.findById({ _id: decodedToken.userId });
    if ((userId._id = decodedToken.userId)) {
      next();
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Kindly login again to access this resource.`,
    });
  }
};
