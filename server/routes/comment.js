const express = require("express");
const authCheck = require("../config/auth-check");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

const router = new express.Router();

router.post("/create", authCheck, (req, res) => {
  const commentObj = req.body;

  /*
    {
        content: String,
        user: {
            ...asdf
        },
        postId: String
    }
  */
  console.log("Creating a comment!");
  /*
          const validationResult = validatePostCreateForm(bookObj)
          if (!validationResult.success) {
          return res.status(200).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
          })
          }
         */
  const comment = {
    content: commentObj.content,
    author: commentObj.user.username
  };
  Comment.create(comment)
    .then(createdComment => {
      User.update(
        { _id: commentObj.user.id },
        { $push: { comments: createdComment._id } }
      ).catch(err => console.log(err));
      Post.update(
        { _id: commentObj.postId },
        { $push: { comments: createdComment._id } }
      ).catch(err => console.log(err));
      res.status(200).json({
        success: true,
        message: "Comment added successfully.",
        data: createdComment
      });
    })
    .catch(err => {
      console.log(err);
      let message = "Something went wrong :( Could not create comment.";

      return res.status(200).json({
        success: false,
        message: message
      });
    });
});
router.get("/user/comments", (req, res) => {
  // ToDo
});
router.post("/like/:id", authCheck, (req, res) => {
  Comment.findById(req.params.id, function(err, commentData) {
    if (commentData) {
      commentData.likes += 1;
      commentData.save(function(err) {
        if (err) console.log(err);
      });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
