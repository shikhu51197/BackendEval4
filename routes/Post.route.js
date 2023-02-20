const express = require("express");
const { PostModel } = require("../model/post.model");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const posts = await PostModel.find();
  res.send(posts);
});

postRouter.post("/addpost", async (req, res) => {
  const { title, body, device, no_if_comments } = req.body;

  try {
    const posts = new PostModel({ title, body, device, no_if_comments });
    await posts.save();
    res.send({ msg: "data posted successfully" });
    console.log("data posted successfully");
  } catch (err) {
    res.send({ msg: "Error to register user", err: err.message });
  }
});
postRouter.patch("update/:id", async (req, res) => {
  const id = req.params.id;

  await PostModel.findByIdAndUpdate({ _id: id }, req.body);
  res.send(`your ${id} has been updated`);
});

postRouter.delete("delete/:id", async (req, res) => {
  const id = req.params.id;

  await PostModel.findByIdAndDelete({ _id: id });
  res.send(`your ${id} has been deleted`);
});

module.exports = { postRouter };
