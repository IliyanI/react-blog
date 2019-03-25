const express = require("express");
const authCheck = require("../config/auth-check");
const Post = require("../models/Post");
const User = require("../models/User");

// const multer = require("multer");
// //const upload = multer({ dest: "uploads/" });
// //tRAVERSY UPLOAD
// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });
// const upload = multer({
//   storage: storage
// }).single("image");

const router = new express.Router();

function validatePostCreateForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  /*
    title, read time, author, description, content
    */
  if (
    !payload ||
    typeof payload.title !== "string" ||
    payload.title.length < 3
  ) {
    isFormValid = false;
    errors.name = "Book name must be at least 3 symbols.";
  }

  if (
    !payload ||
    typeof payload.description !== "string" ||
    payload.description.length < 10 ||
    payload.description.length > 200
  ) {
    isFormValid = false;
    errors.description =
      "Description must be at least 10 symbols and less than 120 symbols.";
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false;
    errors.price = "Price must be a positive number.";
  }

  if (
    !payload ||
    typeof payload.image !== "string" ||
    !(
      payload.image.startsWith("https://") ||
      payload.image.startsWith("http://")
    ) ||
    payload.image.length < 14
  ) {
    isFormValid = false;
    errors.image =
      "Please enter valid Image URL. Image URL must be at least 14 symbols.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post("/create", authCheck, (req, res) => {
  const postObj = req.body;
  // upload(req, res, err => {
  //   console.log(req.file);
  // });
  // debugger;
  console.log("Creating a post!");
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
  const post = {
    title: postObj.title,
    category: postObj.category,
    description: postObj.description,
    content: postObj.content,
    author: postObj.author,
    readTime: postObj.readTime,
    imageUrl: postObj.imageUrl
  };

  Post.create(post)
    .then(createdPost => {
      User.update({ _id: postObj.id }, { $push: { posts: createdPost._id } })
        .then(data => console.log(data))
        .catch(err => console.log(err));
      res.status(200).json({
        success: true,
        message: "Post added successfully.",
        data: createdPost
      });
    })
    .catch(err => {
      console.log(err);
      let message = "Something went wrong :( Check the form for errors.";
      if (err.code === 11000) {
        message = "Post with the given name already exists.";
      }
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});
router.get("/all", (req, res) => {
  Post.find({})
    .populate("comments")
    .then(posts => {
      res.send(posts);
    });
});
router.post("/like/:id", (req, res) => {
  Post.findById(req.params.id, function(err, postData) {
    if (postData) {
      postData.likes += 1;
      postData.save(function(err) {
        if (err) console.log(err);
      });
    } else {
      console.log(err);
    }
  });
});
router.get("/get/:id", (req, res) => {
  if (req.params.id !== "undefined") {
    Post.findById(req.params.id)
      .populate("comments")
      .then(post => {
        res.send(post);
      })
      .catch(err => res.send(err));
  }
});
router.get("/get/comments/:id", (req, res) => {
  if (req.params.id !== "undefined") {
    Post.findById(req.params.id)
      .populate("comments")
      .then(post => {
        res.send(post.comments);
      })
      .catch(err => res.send(err));
  }
});
router.post("/edit", authCheck, (req, res) => {
  //make the authcheck so only the author or an admin can edit or delete
  const reqObj = req.body;
  console.log(reqObj);
  Post.findById(reqObj._id, function(err, postData) {
    if (postData) {
      postData.title = reqObj.title;
      postData.category = reqObj.category;
      postData.content = reqObj.content;
      postData.readTime = reqObj.readTime;
      postData.description = reqObj.description;
      postData.save(err => {
        if (err) console.log(err);
      });
      res.status(200).json({
        success: true,
        message: "Post edited successfully.",
        data: postData
      });
    } else {
      console.log(err);
    }
  });
});

router.delete("/delete/:id", authCheck, (req, res) => {
  Post.findOneAndRemove({ _id: req.params.id }).then(data => {
    res.status(200).json({
      success: true,
      message: "Post deleted successfully."
    });
  });
});

module.exports = router;
