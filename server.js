const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 8000;
const connectionURL =
  "mongodb+srv://muqtasid:mkmongodb%4024@mkdatabase.k9ax8fm.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=MkDatabase";
  const bodyParser = require('body-parser')
  const cookieParser = require('cookie-parser')

  const userRouter = require('./Routes/User/user.routes.js');
  const booksRouter = require('./Routes/Books/books.routes.js');

  async function connectDB() {
  try {
    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectDB();

app.use(bodyParser.json());
app.use(cookieParser());
require("dotenv").config();

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use("/api",userRouter)
app.use("/api",booksRouter)