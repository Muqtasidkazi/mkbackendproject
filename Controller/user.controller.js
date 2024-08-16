const UserModel = require("../Models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const emailValidation = await UserModel.findOne({ email: email });
      if (emailValidation) {
        res.status(400).json({ message: "Email already exists" });
      } else {
        bcrypt.genSalt((err, salt) => {
          if (err) {
            return;
          }
          bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
              return;
            }
            const createdUser = await UserModel.create({
              name: name,
              email: email,
              password: hash,
            });
            if (createdUser) {
              res.status(201).json({
                message: "User has been created !!",
                createdUser: createdUser,
              });
              console.log("user created");
            } else {
              res.status(404).json({ message: "User not created" });
            }
          });
        });
      }
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

exports.updateUser = async (req, res) => {
  const paramsId = req.params.id;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(paramsId, req.body, {
      name: name,
      email: email,
      password: password,
    });

    if (updatedUser) {
      res.status(200).json({
        success: true,
        msg: "User has been updated successfully",
        updatedUser,
      });
      console.log("user update successfully");
    } else {
      res.status(404).json({
        success: false,
        msg: "User not found with the given id",
      });
    }
  } catch (error) {
    console.log(error, "error while updating user ");
  }
};

exports.deleteUser = async (req, res) => {
  const paramsId = req.params.id;
  try {
    const deleteUser = await UserModel.findByIdAndDelete(paramsId);
    const allUsers = await UserModel.find({});

    if (deleteUser) {
      res.status(200).json({
        success: true,
        msg: "User has been deleted successfully",
        allUsers,
      });
      console.log("user deleted successfully");
    } else {
      res.status(404).json({
        success: false,
        msg: "User not found with the given id",
      });
    }
  } catch (error) {
    console.log(error, "error while deleting user");
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (findUser) {
      bcrypt.compare(password, findUser.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return;
        }
        if (result) {
          let jwtKey = process.env.JWT_SECRET_KEY;
          let data = {
            time: Date(),
            userId: findUser._id,
          };
          let tokenGenerated = jwt.sign(data, jwtKey);
          res.cookie("userToken", tokenGenerated, { httpOnly: true });
          return res.status(200).json({
            success: true,
            msg: "User logged in successfully",
            findUser,
          });
        } else {
          console.log("Passwords do not match! Authentication failed.");
          return res.status(401).json({
            success: false,
            msg: "Passwords do not match! Authentication failed.",
          });
        }
      });
    } else {
      res.status(404).json({
        success: false,
        messsage: "User with this email does not exist !!",
      });
      console.log("user with this email id does not exist");
    }
  } catch (error) {
    console.log(error, "error while login");
  }
};

exports.userLogout = async (req, res) => {
  try {
    res.clearCookie("userToken");
    return res.status(200).json({ message: "logout suceeded", success: true });
  } catch (error) {
    console.log(error, "error while logout");
    // return res.status()
  }
};
