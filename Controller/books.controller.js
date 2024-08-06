const BookModel = require("../Models/books.model.js");
const UserModel = require("../Models/user.model.js");
exports.createBook = async (req, res) => {
  const { userID, bookName } = req.body;
  try {
    // console.log(userID,'user id idhr hai');
    const user = await UserModel.findOne({ _id: userID });
    console.log(user.name);
    console.log(user._id);

    if (user) {
      const newBook = await BookModel.create({
        user_id: user._id,
        bookName: bookName,
      });
      console.log(newBook);
      return res.status(201).json({
        success: true,
        message: "Book created successfully",
      });
    }
  } catch (error) {
    console.log(error, "error while creating book");
  }
};

exports.getBooks = async (req, res) => {
  try {
    const allBooks = await BookModel.find();
    if (allBooks) {
      return res.status(200).json(allBooks);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error inn get books",
      error: error,
    });
  }
};

exports.getBooksById = async (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  try {
    const findBook = await BookModel.find({
      user_id: userID,
    });
    if (findBook) {
      return res.status(200).json({
        success: true,
        message: "Books found successfully",
        books: findBook,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No books found",
      });
    }
  } catch (error) {}
};
