const express = require("express");
const routes = express.Router();
const {
  createBook,
  getBooks,
  getBooksById,
} = require("../../Controller/books.controller");
const { isAuthenticated } = require("../../Middleware/auth");

routes.post("/createBook", isAuthenticated, createBook);
routes.get("/getBooks", isAuthenticated, getBooks);
routes.get("/getBooksById/:id", isAuthenticated, getBooksById);
module.exports = routes;
