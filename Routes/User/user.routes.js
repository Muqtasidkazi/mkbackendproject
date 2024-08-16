const express = require("express");
const routes = express.Router();

const { getUser, createUser, updateUser, deleteUser, userLogin, userLogout } = require("../../Controller/user.controller.js");
const { isAuthenticated } = require("../../Middleware/auth.js");
routes.get("/getUser", getUser);
routes.post("/createUser",createUser);
routes.put("/updateUser/:id",isAuthenticated,updateUser);
routes.delete("/deleteUser/:id",isAuthenticated,deleteUser);
routes.post("/userLogin",userLogin);
routes.post("/userLogout",userLogout);
module.exports = routes;