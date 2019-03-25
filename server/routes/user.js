const express = require("express");
const authCheck = require("../config/auth-check");
const User = require("../models/User");

const router = new express.Router();

router.post("/data", authCheck, (req, res) => {
  const userObj = req.body;
  User.findById(userObj.id)
    .populate("posts")
    .then(user => {
      res.status(200).json({
        posts: user.posts
      });
    });
});
router.post("/isauthed", authCheck, (req, res) => {
  console.log("isAuthed");
  res.status(200).json({
    authed: true,
    user: req.user
  });
});
module.exports = router;
