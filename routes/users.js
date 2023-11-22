const express = require("express");
const User = require("../models/users.js");

router = express.Router();

router.post("/", async (req, res) => {
  const { fname, lname, username, email } = req.body;

  try {
    const user = new User({ fname, lname, username, email });
    const newUser = await user.save();
    res.status(200).json({
      success: true,
      newUser,
    });
  } catch (e) {
    if (e.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: Object.values(e.errors).map((val) => val.message),
      });
    } else {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).json({
        success: true,
        users,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "no users",
      });
    }
  } catch (e) {
    res.status(400).json({
      sucess: false,
      message: e.message,
    });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({
        success: true,
        user: user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Cannot find user",
      });
    }
  } catch (e) {
    res.status(400).json({
      sucess: false,
      message: e.message,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).json({
        success: true,
        deletedUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "unable to delete user",
      });
    }
  } catch (e) {
    res.status(400).json({
      sucess: false,
      message: e.message,
    });
    console.log(e.message);
  }
});

router.put("/:id", async (req, res) => {
  const { username, email } = req.body;
  const { id } = req.params;
  try {
    const changeUser = await User.findByIdAndUpdate(id, { username, email });
    const updatedUser = await changeUser.save();
    console.log(updatedUser);
    if (updatedUser) {
      res.status(200).json({
        success: true,
        updatedUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to change user.",
      });
    }
  } catch (e) {
    res.status(400).json({
      sucess: false,
      message: e.message,
    });
  }
});

module.exports = router;
