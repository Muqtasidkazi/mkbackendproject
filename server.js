const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 8000;
const connectionURL =
  "mongodb+srv://fury5452:mongoFury%4024@cluster0.jfuxpmf.mongodb.net/healthcaredb?retryWrites=true&w=majority&appName=Cluster0";

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const userRouter = require("./Routes/User/user.routes.js");
const booksRouter = require("./Routes/Books/books.routes.js");

async function connectDB() {
  try {
    mongoose.connect(connectionURL).then(() => {
      console.log('Connected to MongoDB');
    
      // List all collections in the database
      mongoose.connection.db.listCollections().toArray((err, collections) => {
        if (err) {
          console.error('Error listing collections:', err);
        } else {
          console.log('Collections in the database:', collections);
        }
    
        // Optionally close the connection
        mongoose.connection.close();
      });
    }).catch(err => {
      console.error('Error connecting to MongoDB:', err);
    });
    
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

app.use("/api", userRouter);
app.use("/api", booksRouter);
