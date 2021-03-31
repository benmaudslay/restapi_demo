const { Router } = require("express");
const {
  getAllPosts,
  getUsersPosts,
  addPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const postRouter = Router();

postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/:user_id", getUsersPosts);
postRouter.post("/posts/:user_id", addPost);
postRouter.patch("/posts/:id", updatePost);
postRouter.delete("/posts/:id", deletePost);

module.exports = {
  postRouter,
};
