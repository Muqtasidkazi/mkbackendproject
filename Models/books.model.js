const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  user_id: mongoose.Types.ObjectId,
  bookName: String,
});

const BookModel = mongoose.model("books", bookSchema);

module.exports = BookModel;
