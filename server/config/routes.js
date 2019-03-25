const authRoutes = require("../routes/auth");
const postRoutes = require("../routes/post");
const commentRoutes = require("../routes/comment");
const userRoutes = require("../routes/user");

module.exports = app => {
  app.use("/auth", authRoutes);
  app.use("/post", postRoutes);
  app.use("/comment", commentRoutes);
  app.use("/user", userRoutes);
};
