const express = require("express");
router = express.Router();
const Comment = require("../models/comments.js");
router.get("/", (req, res, next) => {
  // console.log(posts, "THIS IS THE POSTS");
  // res.render("posts.pug", {
  //   title: "Posts",
  //   posts: posts,
  //   header: "GET - POSTS",
  // });
  // res.status(200).json({
  //   posts,
  //   success: true,
  // });

  res.body = posts;
  next();
});

router.get("/:id", (req, res, next) => {
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  if (post) {
    res.status(200).json({
      post,
      success: true,
    });
    res.body = post;
  } else {
    res.status(404);
  }
  next();
});

router.post("/", (req, res, next) => {
  const { title, description, username } = req.body;

  if (title && description && username) {
    const post = {
      id: posts[posts.length - 1]?.id + 1 || 1,
      title,
      description,
      username,
    };

    posts.push(post);
    updateFile("./data/posts.js", posts);
    res.status(201).json({
      post,
      success: true,
    });
    res.body = post;
  } else {
    res.status(400);
  }
  next();
});

router.post("/", async (req, res) => {
  const { title, description, username } = req.body;

  try {
    const comment = new Comment({ title, description, username });
    const newComment = await comment.save();
    res.status(200).json({
      success: true,
      newComment,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Unable to create comment.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const comment = await Comment.find({});
    if (comment) {
      res.status(200).json({
        success: true,
        comment,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No comments",
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
    const comment = await Comment.findById(id);
    if (comment) {
      res.status(200).json({
        success: true,
        comment,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Cannot find comment.",
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
    const deletedUser = await Comment.findByIdAndDelete(id);
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
  const { description } = req.body;
  const { id } = req.params;
  try {
    const changeComment = await Comment.findByIdAndUpdate(id, { description });
    const updatedComment = await changeComment.save();
    console.log(updatedComment);
    if (updatedComment) {
      res.status(200).json({
        success: true,
        updatedComment,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to change comment.",
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
