// const express=require("express");

// const app = express();
// // set the view engine to ejs
// app.set('view engine', 'ejs');

// const port = 9000;

// app.get("/", (req, res) => {
//   const List=["one","two","three","four"]
//   res.render("index",{List});
// });

// app.listen(9000, () => {
//   console.log(`Server is running on Port ${port}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect("mongodb+srv://mongoDB1:uE85CDXAgVnjzu1d@cluster0.i0bhhlu.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
});

// Define a schema for the blogs collection
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Define a model for the blogs collection using the schema
const Blog = mongoose.model("blogs", blogSchema);

// Set up the server
const port = 9000;
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

// Route for the home page
app.get("/", async (req, res) => {
  try {
    // Retrieve all the documents from the blogs collection
    const blogs = await Blog.find({});
    const List = blogs.map((blog) => blog.title); // Extract the titles from the documents
    res.render('index', { List });
  } catch (err) {
    console.log("Error retrieving blogs", err);
    res.status(500).send("Internal Server Error");
  }
});
