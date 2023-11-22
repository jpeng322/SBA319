const express = require("express");
router = express.Router();
const Comment = require("../models/comments.js");

router.post("/", async (req, res) => {
  const { description, username, postId } = req.body;

  try {
    const comment = new Comment({ description, username, postId });
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
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (deletedComment) {
      res.status(200).json({
        success: true,
        deletedComment,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to delete comment",
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
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );
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
