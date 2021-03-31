require("./db/connection");
const express = require("express");
const { Post } = require("./models/Post");
const { User } = require("./models/User");

const port = process.env.PORT || 5000;
// init instance of express
const app = express();

// middleware
app.use(express.json());

// routes/endpoints
app.get("/health", (req, res) => {
  res.send({ message: "API is working correctly" });
});

app.get("/user", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/user", async (req, res) => {
  // this is the route to add a user
  try {
    const user = new User(req.body);
    // ^ this is the same as:
    // const user = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    // });
    const returnedValue = await user.save();
    res.status(201).send(`Successfully added ${returnedValue.name}`);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/user/:id", async (req, res) => {
  // this will be our route to update a user
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
});

app.delete("/user/:id", async (req, res) => {
  // this will be our route to delete a user
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
    // If you wanted to use promises instead of async:
    // User.findByIdAndDelete(req.params.id)
    //   .then((user) => res.send(user))
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
});

// post routes
app.get("/posts", async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/posts/:user_id", async (req, res) => {
  try {
    const allPosts = await Post.find({ author: req.params.user_id });
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/posts/:user_id", async (req, res) => {
  try {
    const post = new Post(req.body);
    post.author = req.params.user_id;
    const returnedValue = await post.save();

    res.status(201).send(returnedValue);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(post);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ message: "post not found" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ message: "post not found" });
  }
});

// server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
