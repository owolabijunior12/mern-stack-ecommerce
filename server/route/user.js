const express = require("express");
const router = express.Router();
const User = require("../model/signup");

// Route to save a new user
router.post("/save", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({ success: true, user: newUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to save new user" });
  }
});

// Route to log out
router.get("/logout", (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successful" });
});

// Route to get all users
router.get('/getUser', async (req, res) => {
  try {
    const options = {
      sort: { createdAt: 1 }
    };
    const users = await User.find({}, null, options);
    if (users.length > 0) {
      res.status(200).send({ success: true, users });
    } else {
      res.status(200).send({ success: true, msg: 'No Data Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: 'Internal Server Error' });
  }
});

// Route to get a single user by ID
router.get("/singleUser/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
});

// Route to sign in a user
router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    console.log({
        _id: user._id,
      name: user.name,
      email: user.email,
      username:user.username
    });
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      throw new Error("Invalid credentials");
    }
    res.status(200).json({ success: true, user: user._id });
  } catch (error) {
    console.error(error);
    next(new Error("Cannot log in, check your credentials"));
  }
});
// userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (user && bcrypt.compareSync(req.body.password, user.password)) {
//     res.send({
    
//       isAdmin: user.isAdmin,
//       token: generateToken(user)
//     });
//     console.log({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user)
//     });
//   } else {
//     res.status(401).send({ message: 'Invalid email or password' });
//   }
// }))

// Route to delete a user by ID
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    if (user.deletedCount === 0) {
      return res.status(404).json({ success: false, error: "user not found" });
    }
    res.status(200).json({ success: true, message: "user is deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
