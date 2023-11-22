const express = require("express");
const User = require("../models/users.js");

router = express.Router();

router.post("/", async (req, res) => {
  const { fname, lname, username, email } = req.body;

  try {
    // const post = await Post.findById(req.params.postId).populate("comments");
    const user = new User({ fname, lname, username, email });
    // const user = await User.findById(req.user.id);
    // comment.createdBy.push(user);
    const newUser = await user.save();
    res.status(200).json({
      success: true,
      newUser,
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      success: false,
      message: "unable to create user",
    });
  }
});

// router.get("/", (req, res, next) => {
//   // res.status(200).json({
//   //   users,
//   //   success: true,
//   // });
//   res.body = users;
//   next();
// });

// router.get("/:id", (req, res, next) => {
//   const user = users.find((user) => user.id === parseInt(req.params.id));

//   if (user) {
//     res.status(200).json({ user, success: true });
//   } else {
//     res.status(404);
//   }
//   res.body = user;

//   next();
// });

module.exports = router;
