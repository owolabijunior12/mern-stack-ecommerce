const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(bodyParser.json());

 //! Enable CORS for all routes
app.use(cors());
app.get("/", (req, res) => {
  return res.json("hello iboytech to the world");
});



//! Route for handling product-related requests
const productRoute = require("./route/product");
app.use("/api/product/", productRoute);

//! Route for handling user-related requests
const userRoute = require("./route/user");
app.use("/api/user/", userRoute);



try {
  //! Connect to MongoDB database
  mongoose.connect(process.env.DB_STRINGS, {
    useNewUrlParser: true,
    //! useUnifiedTopology: true
  });
  console.log("Connected to MongoDB database...");
} catch (error) {
  console.error(error);
}

app.listen(1609, () => {
  console.log("Server started and listening on port 1609");
});
