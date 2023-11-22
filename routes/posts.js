const express = require("express");
router = express.Router();
const Post = require("../models/posts.js");

router.post("/", async (req, res) => {
  const { title, description, username } = req.body;

  try {
    const post = new Post({ title, description, username });
    const newPost = await post.save();
    res.status(200).json({
      success: true,
      newPost,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Unable to create post.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const post = await Post.find({});
    if (post) {
      res.status(200).json({
        success: true,
        post,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No posts",
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
    const post = await Post.findById(id);
    if (post) {
      res.status(200).json({
        success: true,
        post,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Cannot find post.",
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
    const deletedPost = await Post.findByIdAndDelete(id);
    if (deletedPost) {
      res.status(200).json({
        success: true,
        deletedPost,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to delete post",
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
  const { description } = req.body;
  const { id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );
    if (updatedPost) {
      res.status(200).json({
        success: true,
        updatedPost,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to change post.",
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
