const mongoose = require('mongoose');

const userBookModel = mongoose.Schema({
    user_id:mongoose.Types.ObjectId,
    book_id:mongoose.Types.ObjectId,
})

 const book = mongoose.model('book',)

 module.exports = book